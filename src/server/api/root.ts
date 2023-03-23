import { createTRPCRouter } from "./trpc";

// ROUTERS
import { organizationRouter } from "./routers/organization";
import { customerUserProfileRouter } from "./routers/customerUserProfile";
import { customerRouter } from "./routers/customer";
import { userRouter } from "./routers/user";
import { invitationRouter } from "./routers/invitation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
  customerUserProfile: customerUserProfileRouter,
  customer: customerRouter,
  user: userRouter,
  invitation: invitationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
