// import { protectedProcedure, publicProcedure, router } from "~/server/trpc";
// import { prisma } from "~/server/prisma";
// import { z } from "zod";
// import { seasonAddValidation } from "~/utils/validation";
//
// export const seasonsRouter = router({
//   list: publicProcedure.query(async () => {
//     return await prisma.season.findMany({
//       orderBy: [
//         {
//           current: "desc",
//         },
//         {
//           number: "desc",
//         },
//       ],
//     });
//   }),
//
//   activate: protectedProcedure
//     .input(
//       z.object({
//         id: z.number(),
//       }),
//     )
//     .mutation(async ({ input }) => {
//       await prisma.season.updateMany({
//         data: {
//           current: false,
//         },
//       });
//       return await prisma.season.update({
//         where: {
//           id: input.id,
//         },
//         data: {
//           current: true,
//         },
//       });
//     }),
//
//   add: protectedProcedure
//     .input(seasonAddValidation)
//     .mutation(async ({ input }) => {
//       return await prisma.season.create({
//         data: {
//           number: input.number,
//           current: false,
//         },
//       });
//     }),
//
//   delete: protectedProcedure
//     .input(
//       z.object({
//         id: z.number(),
//       }),
//     )
//     .mutation(async ({ input }) => {
//       return await prisma.season.delete({
//         where: {
//           id: input.id,
//         },
//       });
//     }),
// });
