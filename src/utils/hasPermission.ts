import { Role } from "@prisma/client";
import { roleNumberHierarchy } from "../constants/misc";

const hasPermission = (minimumRequiredRole: Role, userRole: Role, exemptFromPermissionCheckIfTrue: boolean): boolean => {
  return roleNumberHierarchy[userRole] >= roleNumberHierarchy[minimumRequiredRole] || exemptFromPermissionCheckIfTrue === true;
}

export default hasPermission;

export const getOnlyOwn = (userRole: Role, userId: string, userIdPropName = 'userId', minimumRequiredRole: Role = Role.ADMIN): Record<string, string> => {
  return roleNumberHierarchy[userRole] >= roleNumberHierarchy[minimumRequiredRole]
    ? {}
    : { [userIdPropName]: userId };
}