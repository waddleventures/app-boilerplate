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

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.customer.findMany({
      where: { organizationId: ctx.session.user.organizationId },
    })
  }),

});