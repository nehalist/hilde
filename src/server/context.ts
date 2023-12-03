// import { inferAsyncReturnType } from "@trpc/server";
// import * as trpcNext from "@trpc/server/adapters/next";
// import { authOptions } from "~/_pages/api/auth/[...nextauth]";
// import { getServerSession } from "next-auth";
// import { prisma } from "~/server/prisma";
//
// /**
//  * Creates context for an incoming request
//  * @link https://trpc.io/docs/context
//  */
// export async function createContext(opts: trpcNext.CreateNextContextOptions) {
//   const { req, res } = opts;
//   const session = await getServerSession(req, res, authOptions);
//   return {
//     req,
//     res,
//     user: session
//       ? await prisma.user.findUnique({
//           where: { email: session.user?.email || undefined },
//         })
//       : null,
//   };
// }
//
// export type Context = inferAsyncReturnType<typeof createContext>;
