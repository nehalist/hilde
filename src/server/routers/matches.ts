import { publicProcedure, router } from "~/server/trpc";
import { prisma } from "~/server/prisma";
import { z } from "zod";
import { getOrCreateTeam, updateTeam } from "~/server/model/team";
import { createMatch } from "~/server/model/match";
import { calculateRating, getExpectedRating } from "~/utils/elo";

function normalizeTeamName(name: string) {
  return name
    .split(",")
    .map(t => t.toLowerCase().trim())
    .sort()
    .join(",")
    .trim();
}

export const matchesRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.match.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: input.limit,
      });
    }),

  add: publicProcedure
    .input(
      z.object({
        team1: z.string().min(2).transform(normalizeTeamName),
        team2: z.string().min(2).transform(normalizeTeamName),
        score1: z.number().min(0),
        score2: z.number().min(0),
        comment: z.string().optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      const team1 = await getOrCreateTeam(input.team1);
      const team2 = await getOrCreateTeam(input.team2);

      const teamRating1 = team1.rating;
      const teamRating2 = team2.rating;

      const expected1 = getExpectedRating(teamRating1, teamRating2);
      const expected2 = getExpectedRating(teamRating2, teamRating1);

      const rating1 = calculateRating(
        expected1,
        input.score1 > input.score2 ? 1 : 0,
        teamRating1,
      );
      const ratingDiff1 = teamRating1 - rating1;
      const rating2 = calculateRating(
        expected2,
        input.score1 < input.score2 ? 1 : 0,
        teamRating2,
      );
      const ratingDiff2 = teamRating2 - rating2;

      await updateTeam(
        team1,
        rating1,
        input.score1 > input.score2,
        input.score1,
      );
      await updateTeam(
        team2,
        rating2,
        input.score1 < input.score2,
        input.score2,
      );

      return await createMatch(
        input.team1,
        input.team2,
        input.score1,
        input.score2,
        input.comment,
        ratingDiff1,
        ratingDiff2,
      );
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.match.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
