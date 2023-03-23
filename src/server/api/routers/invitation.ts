import { Role } from "@prisma/client";
import { z } from "zod";
import jwt from 'jsonwebtoken';

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import sendEmail from "../../email";
import { CEmailTemplateIds } from "../../../constants/emails.constants";

export const invitationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        role: z.enum([Role.USER, Role.ADMIN]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Generate a token
      const token = jwt.sign(
        {
          email: input.email,
          role: input.role,
        },
        env.NEXTAUTH_SECRET as string,
        { expiresIn: '24h' }
      );

      // Insert invitation into db
      const invitation = await ctx.prisma.invitation.create({
        data: {
          role: input.role,
          name: input.name,
          email: input.email,
          token,
          organization: { connect: { id: ctx.session.user.organizationId } },
        }
      });

      // Send email
      await sendEmail({
        to: input.email,
        templateId: CEmailTemplateIds.SEND_USER_INVITATION as string,
        vars: { "linkUrl": `https://app-ambassadors.vercel.app/auth/accept-invitation?invitationToken=${token}`, }
      });

      return invitation;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: { organizationId: ctx.session.user.organizationId },
    })
  }),

  getOne: protectedProcedure
    .input(
      z.object({
        invitationId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ 
        where: { id: input.invitationId },
      });
    })
});