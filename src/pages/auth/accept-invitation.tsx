import { useRouter } from "next/router";

export default function AcceptInvitation() {
  const router = useRouter();
  
  const invitationToken = (router.query.invitationToken as string | undefined) || null;

  if (invitationToken) {
    void router.push(`/auth/sign-in?invitationToken=${invitationToken}`);
  } else {
    return (
      <div>
        Missing invitation token
      </div>
    )
  }
}