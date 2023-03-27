import { z } from "zod";

// UTILS
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { generateInvitationToken } from "../../../utils/generateInvitationToken";
import sendEmail from "../../email";

// TYPES
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";


export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.organization.create({
        data: {
          name: input.name,
        }
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany()
  }),

  getOne: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findFirst({ where: { id: ctx.session.user.organizationId }, select: { name: true, id: true, users: { select: { id: true } }} });
  }),

  getOneByInvitationToken: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.invitation.findFirst({
        where: { token: input.token, used: false },
        include: {
          organization: {
            select: {
              id: true,
              name: true,
            },
          }
        }
      })
    }),
  
    finalizeAcceptInvite: protectedProcedure
      .input(
        z.object({
          token: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        // Find the invite
        const invite = await ctx.prisma.invitation.findFirst({
          where: { token: input.token },
        });

        // Make sure we have an invitation
        if (!invite) {
          // Delete the new user
          await ctx.prisma.user.delete({ where: { id: ctx.session.user.id }, });
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: "Unable to find invitation"
          });
        }

        // Validate the email matches that of the new user
        console.log('emails')
        console.log(invite.email, ctx.session.user.email);
        if (invite.email !== ctx.session.user.email) {
          // Delete the new user
          await ctx.prisma.user.delete({
            where: { id: ctx.session.user.id },
          });
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: "The provided email doesn't match the email on the invitation"
          });
        }

        // Set the invitation to used
        await ctx.prisma.invitation.update({
          where: { id: invite.id },
          data: { used: true },
        });

        // If the role on the invitation was Role.AMBASSADOR, we need to do a few more things
        if (invite.role === Role.CUSTOMER) {
          // Get the ambassador proto
          const customerUserProfileProto = await ctx.prisma.customerUserProfileProto.findFirst({
            where: { email: invite.email },
            include: { customer: true, }
          });

          if (!customerUserProfileProto)
            throw new TRPCError({
              code: 'UNAUTHORIZED',
              message: "Something went wrong"
            });
          
          // Create the customerUserProfile and change the user's role
          await ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
              role: Role.CUSTOMER,
              customerUserProfile: {
                create: {
                  customer: customerUserProfileProto.customerId ? { connect: { id: customerUserProfileProto.customerId } } : undefined,
                  organization: { connect: { id: invite.organizationId as string } },
                }
              },
              organization: { connect: { id: invite.organizationId as string } },
            }
          })

          // Remove the customerUserProfileProto
          await ctx.prisma.customerUserProfileProto.delete({ where: { id: customerUserProfileProto.id }});
        } else {
          // Add the user to the organization
          await ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
              organization: { connect: { id: invite.organizationId as string } },
            },
          });
        }
      }),
  
    finalizeSignUpNewOrganization: protectedProcedure
      .input(
        z.object({
          organizationName: z.string(),
          invitationEmails: z.array(z.string()),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Create the new organization
        const organization = await ctx.prisma.organization.create({
          data: { name: input.organizationName },
        });

        // Link the user to the new organization
        // And set the user's role to admin as they are the first user in the org
        await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            role: Role.ADMIN,
            organization: { connect: { id: organization.id } },
          }
        });

        // If we have invitations, send them
        if (input.invitationEmails && input.invitationEmails.length) {
          for (let i = 0; i < input.invitationEmails.length; i += 1) {
            // Get the email
            const email = input.invitationEmails[i] as string;
            // Generate a token
            const token = generateInvitationToken(email, Role.USER);
            // Insert invitation into db
            await ctx.prisma.invitation.create({
              data: {
                role: Role.USER,
                name: email,
                email: email,
                token,
                organization: { connect: { id: organization.id } },
              }
            });

            // Send email
            await sendEmail({
              to: email,
              from: 'johan.hoernell@waddleventures.com',
              templateId: "d-fb96115eecea4309bc34ff2e70b588b9",
              vars: {
                "linkUrl": `https://wv-boilerplate.vercel.app/auth/accept-invitation?invitationToken=${token}`,
              }
            });
          }
          
        }
      }),

  addUserToOrganization: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        organizationid: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: input.userId },
        data: {
          organization: { connect: { id: input.organizationid } },
        },
      })
    }),
});