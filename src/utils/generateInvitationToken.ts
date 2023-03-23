import { type Role } from "@prisma/client";
import { env } from "../env/server.mjs";
import jwt from 'jsonwebtoken';

export const generateInvitationToken = (email: string, role: Role): string => {
  return jwt.sign(
    {
      email,
      role,
    },
    env.NEXTAUTH_SECRET as string,
    { expiresIn: '24h' }
  );
}