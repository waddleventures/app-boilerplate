import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

// COMPONENTS
import PageLoadingIndicator from "../../components/PageLoadingIndicator";

// TYPES
import { Role } from "@prisma/client";

function Auth({ children }: { children: JSX.Element }) {
  const router = useRouter();

  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data: session } = useSession({ required: true })

  if (status === "loading") {
    return <PageLoadingIndicator loading={true} />;
  }

  if (!session.user || !session.user.organizationId) {
    void router.push('/auth/sign-in');
    return <PageLoadingIndicator loading={true} />;
  }

  if (session.user.role === Role.CUSTOMER && !router.pathname.includes('/portal')) {
    void router.push('/portal');
    return <PageLoadingIndicator loading={true} />;
  }

  return children
}

export default Auth;