import { publicProcedure, router } from "~/server/trpc";
import { z } from "zod";
import { prisma } from "~/server/prisma";
import { createTeamMeta } from "~/server/model/team";

export const teamsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        teamsize: z.number().default(1),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.team.findMany({
        include: {
          meta: true,
        },
        where: {
          teamsize: input.teamsize,
        },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const team = await prisma.team.delete({
        where: {
          id: input.id,
        },
      });

      await prisma.match.deleteMany({
        where: {
          OR: [
            {
              team1: team.name,
            },
            {
              team2: team.name,
            },
          ],
        },
      });

      return team;
    }),

  byId: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const team = await prisma.team.findUnique({
        include: {
          meta: true,
          achievements: true,
        },
        where: {
          name: input.name,
        },
      });

      if (!team) {
        return null;
      }

      if (team.meta.length === 0) {
        team.meta = [await createTeamMeta(team)];
      }

      return team;
    }),
});
