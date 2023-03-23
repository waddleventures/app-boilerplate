import { z } from "zod";

// UTILS
import hasPermission from "../../../utils/hasPermission";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// TYPES
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: { organizationId: ctx.session.user.organizationId },
    })
  }),

  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ 
        where: { id: input.id },
      });
    }),

  patch: protectedProcedure
    .input(
      z.object({
        query: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
          role: z.enum(["USER", "ADMIN"])
        }).partial()
      })
    )
    .mutation(({ ctx, input }) => {
      if (!hasPermission(Role.ADMIN, ctx.session.user.role, ctx.session.user.id === input.query.id))
        throw new TRPCError({ code: 'UNAUTHORIZED' });

      return ctx.prisma.user.update({
        where: { id: input.query.id },
        data: input.body,
      });
    }),
  
  deleteOne: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.user.delete({
      where: { id: ctx.session.user.id },
    })
  }),

  verifyOrganization: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    if (!user || !user.organizationId) {
      // If the user exists but has no organization id, delete it
      if (user) {
        await ctx.prisma.user.delete({
          where: { id: ctx.session.user.id },
        });
      }
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User is not registered on an organization',
      });
    }
  })
});