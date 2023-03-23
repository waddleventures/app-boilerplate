import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import AuthLayout from "../../pageComponents/Auth";
import AuthHeader from "../../pageComponents/Auth/AuthHeader";

// COMPONENTS
import PageLoadingIndicator from "../../components/PageLoadingIndicator";

// UTILS
import { api } from "../../utils/api";

// TYPES
import { EPageMode } from "./sign-in";

enum EPageState {
  IDLE = 'IDLE',
  NO_INVITATION_TOKEN = 'NO_INVITATION_TOKEN',
  EMAIL_MISMATCH = 'EMAIL_MISMATCH',
  NO_ORGANIZATION = 'NO_ORGANIZATION',
}

const AuthSuccessPage = () => {
  const router = useRouter();

  // STATE
  const [pageState, setPageState] = useState<EPageState>(EPageState.IDLE);

  // API
  const finalizeSignUpFromInvitationMutation = api.organization.finalizeAcceptInvite.useMutation({ retry: false });
  const deleteUserMutation = api.user.deleteOne.useMutation({ retry: false });
  const verifySignInMutation = api.user.verifyOrganization.useMutation({ retry: false });

  useEffect(() => {
    const { isReady } = router;

    if (isReady) {
      // CASE 1
      const deleteInvitedUserWithoutInvitationToken = async () => {
        await deleteUserMutation.mutateAsync();
        setPageState(EPageState.NO_INVITATION_TOKEN);
      }
      // CASE 3
      const finalizeSignUpFromInvitation = async () => {
        try {
          await finalizeSignUpFromInvitationMutation.mutateAsync(
            { token: router.query.invitationToken as string, },
            {
              onSuccess: () => void router.push('/'),
              onError: () => setPageState(EPageState.EMAIL_MISMATCH),
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
      // CASE 4
      const verifySignIn = async () => {
        try {
          await verifySignInMutation.mutateAsync(undefined, {
            onSuccess: () => void router.push('/'),
            onError: () => setPageState(EPageState.NO_ORGANIZATION),
          });
        } catch (error) {
          console.error(error);
        }
      }

      const { type, invitationToken } = router.query;
      if (!type || (type === EPageMode.SIGN_UP_WITH_INVITE && !invitationToken)) {
        /**
         * CASE 1
         * The user has successfully signed in, but we can't find an invitation token
         * in this case we need to
         * x) delete the user from the database
         * x) Show no invitation token component
         */
        void deleteInvitedUserWithoutInvitationToken();
      } else if (type === EPageMode.SIGN_UP_NEW_ORG) {
        void router.push('/auth/setup-organization');
      } else if (type === EPageMode.SIGN_UP_WITH_INVITE) {
        /**
         * CASE 3
         * The user has successfully signed in, and we have an invitation code
         * in this case we need to
         * x) validate the new user's email matches that of the invitation token
         * x) => if it does not show invalid email component
         * x) link the new user to the organization of the invitation
         * x) mark the invitation as used
         * x) redirect to / page
         */
        void finalizeSignUpFromInvitation();
      } else {
        /**
         * CASE 4
         * The user has successfully signed in
         * in this case we need to
         * x) validate the user has an organization tied to itself
         * x) if it does, redirect to /
         * x) if not, show user does not exist component 
         */
        void verifySignIn();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  
  return (
    <PageLoadingIndicator loading={pageState === EPageState.IDLE}>
      <AuthLayout header={<AuthHeader.HasError />}>
        <>
          {pageState === EPageState.NO_ORGANIZATION && (
            <Alert type="error" title="No user found">
              <p>
                The email address you provided does not match any registered user.
              </p>
            </Alert>
          )}
          {pageState === EPageState.EMAIL_MISMATCH && (
            <Alert type="error" title="Incorrect email">
              <p>
                The email address you provided does not match that on the invitation.
              </p>
            </Alert>
          )}
          {pageState === EPageState.NO_INVITATION_TOKEN && (
            <Alert type="error" title="No invitation token">
              <p>
                No invitation token was present on the request.
              </p>
            </Alert>
          )}
        </>
      </AuthLayout>
    </PageLoadingIndicator>
  );
}

export default AuthSuccessPage;