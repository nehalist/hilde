/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */

import { Context } from "./context";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

const t = initTRPC.context<Context>().create({
  // /**
  //  * @see https://trpc.io/docs/v10/data-transformers
  //  */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router;

/**
 * Create procedures
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ next, ctx }) => {
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  }),
);
