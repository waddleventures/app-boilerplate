import { Role } from "@prisma/client";

export const EMPTY_TABLE_COL = '---';

export const roleNumberHierarchy: Record<Role, number> = {
  [Role.CUSTOMER]: 0,
  [Role.USER]: 1,
  [Role.ADMIN]: 2,
  [Role.SUPER_ADMIN]: 3,
};


