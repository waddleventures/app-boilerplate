import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.customer.create({
        data: {
          name: input.name,
          organization: {
            connect: {
              id: ctx.session.user.organizationId,
            },
          }
        },
      });
    }),

  createAndAssign: protectedProcedure
    .input(
      z.object({
        ambassadorId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.customer.create({
        data: {
          name: input.name,
          organization: {
            connect: {
              id: ctx.session.user.organizationId,
            },
          },
          ambassadors: {
            connect: {
              id: input.ambassadorId,
            }
          }
        },
      });
    }),

  assign: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
        ambassadorId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ambassador.update({
        where: { id: input.ambassadorId },
        data: {
          customer: {
            connect: {
              id: input.customerId,
            },
          },
        },
      })
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.customer.findMany({
      where: { organizationId: ctx.session.user.organizationId },
    })
  }),

});