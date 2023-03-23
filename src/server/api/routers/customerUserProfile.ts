import { z } from "zod";
import jwt from 'jsonwebtoken';

// UTILS
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import sendEmail from "../../email";

// CONSTANTS
import { CEmailTemplateIds } from "../../../constants/emails.constants";

// TYPES
import { type Customer, Role } from "@prisma/client";
import { createFromProto, createFromUser } from "../../../types/normalizedCustomerUser.type";

export type AmbassadorDefaultInclude = {
  customer: Customer | null;
}

const defaultInclude = {
  customerUserProfile: {
    include: {
      customer: {
        select: {
          name: true,
          id: true,
        },
      }
    }
  }
};

const protoDefaultInclude = { customer: { select: { name: true, id: true }} };

export const customerUserProfileRouter = createTRPCRouter({
  inviteAndCreate: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      /**
       * Create a new customerUserProfileProto
       */
      const customerUserProfileProto = await ctx.prisma.customerUserProfileProto.create({
        data: {
          name: input.name,
          email: input.email,
          organization: { connect: { id: ctx.session.user.organizationId, }, },
        },
      });
      /**
       * Create a new invite
       */
      // Generate a token
      const token = jwt.sign({ email: input.email, role: Role.CUSTOMER, }, env.NEXTAUTH_SECRET as string, { expiresIn: '24h' });

      // Insert invitation into db
      await ctx.prisma.invitation.create({
        data: {
          token,
          email: input.email,
          name: input.name,
          role: Role.CUSTOMER,
          organization: { connect: { id: ctx.session.user.organizationId } },
        }
      });

      // Send email
      await sendEmail({
        to: input.email,
        templateId: CEmailTemplateIds.SEND_CUSTOMER_INVITATION as string,
        vars: { "linkUrl": `https://app-ambassadors.vercel.app/auth/accept-invitation?invitationToken=${token}`, }
      });

      return customerUserProfileProto;
    }),
  
  patch: protectedProcedure
    .input(
      z.object({
        query: z.object({
          userId: z.string(),
          protoId: z.string(),
        }).partial(),
        body: z.object({
          name: z.string(),
          customerId: z.string(),
        }).partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let res;
      if (input.query.protoId) {
        res = ctx.prisma.customerUserProfileProto.update({
          where: { id: input.query.protoId },
          data: { ...input.body },
        })
      } else {
        res = ctx.prisma.user.update({
          where: { id: input.query.userId },
          data: {
            name: input.body.name,
            customerUserProfile: {
              update: {
                customer: { connect: { id: input.body.customerId } },
              }
            }
          },
        })
      }
      return res;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      where: { 
        organizationId: ctx.session.user.organizationId, 
        NOT: [{ customerUserProfile: null }, { customerUserProfile: undefined }]  
      },
      include: defaultInclude
    });
    const protos = await ctx.prisma.customerUserProfileProto.findMany({
      where: { organizationId: ctx.session.user.organizationId },
      include: protoDefaultInclude,
    });

    const normalizedUsers = users.map((user) => createFromUser(user));
    const normalizedProtos = protos.map((proto) => createFromProto(proto));

    return [ ...normalizedUsers, ...normalizedProtos];
  }),

  getOne: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        protoId: z.string(),
      }).partial(),
    )
    .query(async ({ ctx, input }) => {
      let res = null;
      if (input.protoId) {
        const r = await ctx.prisma.customerUserProfileProto.findFirst({
          where: { id: input.protoId },
          include: protoDefaultInclude,
        })
        if (r) res = createFromProto(r);
      } else {
        const r = await ctx.prisma.user.findFirst({
          where: { id: input.userId },
          include: defaultInclude,
        })
        if (r) res = createFromUser(r);
      }
      return res;
    })
});