/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getProviders, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

// COMPONENTS
import AuthLayout from '../../pageComponents/Auth'
import AuthHeader from '../../pageComponents/Auth/AuthHeader'

// TYPES
import type { GetServerSideProps } from 'next'
import { api } from '../../utils/api'
import PageLoadingIndicator from '../../components/PageLoadingIndicator'
import ProviderButton from '../../pageComponents/Auth/ProviderButton'
import Alert from '../../components/Alert'

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

/**
 * This page can be one of three things:
 *  i)   regular sign in to an existing organization
 *  ii)  sign up to an existing organization
 *  iv) sign up and set up a new organization
 * 
 * The cases are differentiated by:
 * i)   !router.query.invitationToken && !router.query.signUp
 * ii)  router.query.invitationToken != null
 * iv) !router.query.invitationToken && router.query.signUp === true
 */

export enum EPageMode {
  SIGN_IN = 'SIGN_IN', // Case i)
  SIGN_UP_WITH_INVITE = 'SIGN_UP_WITH_INVITE', // Case ii)
  SIGN_UP_NEW_ORG = 'SIGN_UP_NEW_ORG', // Case iv)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const derivePageMode = (queryParams: Record<string, any>): EPageMode => {
  if (queryParams.invitationToken && queryParams.invitationToken != '') return EPageMode.SIGN_UP_WITH_INVITE;
  if (queryParams?.signUp === true || queryParams?.signUp === 'true') return EPageMode.SIGN_UP_NEW_ORG;
  return EPageMode.SIGN_IN;
}

export default function SignInPage({ providers }: { providers: typeof getProviders }) {
  // HOOKS
  const router = useRouter();

  // API
  const { data: invitation, isLoading, isError } = api.organization.getOneByInvitationToken.useQuery(
    { token: (router.query.invitationToken as string) },
    { enabled: router.query.invitationToken != null, retry: false },
  );

  // STATE
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageMode, setPageMode] = useState<EPageMode>(derivePageMode(router.query));

  useEffect(() => {
    setPageMode(derivePageMode(router.query));
  }, [router.query]);

  const header = useMemo(() => {
    switch (pageMode) {
      case EPageMode.SIGN_IN:
        return <AuthHeader.SignIn />;
      case EPageMode.SIGN_UP_NEW_ORG:
        return <AuthHeader.SignUpNewOrg />;
      case EPageMode.SIGN_UP_WITH_INVITE:
        return <AuthHeader.AcceptInvitation organizationName={invitation?.organization?.name || ''} />;
    }
  }, [pageMode, invitation]);

  const hasError = useMemo(() => {
    if (
      isError === true 
      || (pageMode === EPageMode.SIGN_UP_WITH_INVITE && !invitation)
    ) return true;
    return false;
  }, [isError, pageMode, invitation]) 

  const loading = useMemo(() => {
    if (pageMode === EPageMode.SIGN_UP_WITH_INVITE && isLoading) return true;
    return false;
  }, [pageMode, isLoading]);

  const finalInvitationToken: string = useMemo(() => {
    if (pageMode === EPageMode.SIGN_UP_WITH_INVITE) return router.query.invitationToken as string | '';
    return '';
  }, [pageMode, router.query]);

  return (
    <PageLoadingIndicator loading={loading}>
      <AuthLayout
        header={hasError ? <AuthHeader.HasError /> : header}
      >
        <>
          {hasError && (
            <Alert type="error" title="Unable to find invitation">
              <p>
                This usually means the invitation has expired or has already been used. <br /><br />
                Please ask your administrator to resend the invitation.
              </p>
            </Alert>
          )}
          {!hasError && (
            <>
              <div className="relative mt-6 mb-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Select authentication provider</span>
                </div>
              </div>
              {Object.values(providers).map((provider) => (
                <ProviderButton
                  key={provider.id}
                  iconClass='ri-google-fill'
                  provider={provider}
                  signInFn={() => void signIn(provider.id, { callbackUrl: `/auth/auth-success?type=${pageMode}&invitationToken=${finalInvitationToken}`})}
                />
              ))}
            </>
          )}
            
        </>
      </AuthLayout>
    </PageLoadingIndicator>
  )
}