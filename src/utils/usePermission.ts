import type { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { roleNumberHierarchy } from "../constants/misc";

const usePermission = (minimumRequiredRole: Role, exemptFromPermissionCheckIfTrue: boolean): boolean => {
  const { data: session, status } = useSession();

  if (status !== 'authenticated' || !session?.user?.role) return false;

  return roleNumberHierarchy[session.user.role] >= roleNumberHierarchy[minimumRequiredRole] || exemptFromPermissionCheckIfTrue === true;
}

export default usePermission;