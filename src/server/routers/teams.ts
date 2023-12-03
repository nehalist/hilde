// import { authenticatedProcedure, router } from "~/server/trpc";
// import { prisma } from "~/server/prisma";
//
// export const teamsRouter = router({
//   list: authenticatedProcedure.query(async ({ input, ctx }) => {
//     return prisma.user
//       .findUnique({
//         where: {
//           id: ctx.user?.id,
//         },
//       })
//       .teams({
//         include: {
//           members: true,
//         },
//       });
//   }),
//
//   // delete: publicProcedure
//   //   .input(
//   //     z.object({
//   //       id: z.number(),
//   //     }),
//   //   )
//   //   .mutation(async ({ input }) => {
//   //     const team = await prisma.team.delete({
//   //       where: {
//   //         id: input.id,
//   //       },
//   //     });
//   //
//   //     await prisma.match.deleteMany({
//   //       where: {
//   //         OR: [
//   //           {
//   //             team1: team.name,
//   //           },
//   //           {
//   //             team2: team.name,
//   //           },
//   //         ],
//   //       },
//   //     });
//   //
//   //     return team;
//   //   }),
//   //
//   // byId: publicProcedure
//   //   .input(
//   //     z.object({
//   //       name: z.string(),
//   //     }),
//   //   )
//   //   .query(async ({ input }) => {
//   //     const team = await prisma.team.findUnique({
//   //       include: {
//   //         meta: true,
//   //         achievements: true,
//   //       },
//   //       where: {
//   //         name: input.name,
//   //       },
//   //     });
//   //
//   //     if (!team) {
//   //       return null;
//   //     }
//   //
//   //     if (team.meta.length === 0) {
//   //       team.meta = [await createTeamMeta(team)];
//   //     }
//   //
//   //     return team;
//   //   }),
//   //
//   // deleteAchievement: publicProcedure
//   //   .input(
//   //     z.object({
//   //       id: z.number(),
//   //     }),
//   //   )
//   //   .mutation(async ({ input }) => {
//   //     const teamAchievement = await prisma.teamAchievement.delete({
//   //       where: {
//   //         id: input.id,
//   //       },
//   //     });
//   //     const team = await prisma.team.findUnique({
//   //       include: {
//   //         meta: true,
//   //       },
//   //       where: {
//   //         id: teamAchievement.teamId,
//   //       },
//   //     });
//   //     if (!teamAchievement || !team) {
//   //       return;
//   //     }
//   //     const achievement = achievements.find(
//   //       a => a.id === teamAchievement.achievement,
//   //     );
//   //     await prisma.teamMeta.update({
//   //       data: {
//   //         achievementPoints: {
//   //           decrement: achievement?.points || 0,
//   //         },
//   //       },
//   //       where: {
//   //         id: team.meta[0].id,
//   //       },
//   //     });
//   //   }),
// });
