import { publicProcedure, router } from "~/server/trpc";
import { z } from "zod";
import { getCurrentSeason } from "~/utils/season";
import { prisma } from "~/server/prisma";
import { Leaderboards } from "~/model";
import { TeamWithMeta } from "~/server/model/team";

export const leaderboardsRouter = router({
  forSeason: publicProcedure
    .input(
      z.object({
        season: z.number().default(getCurrentSeason()),
      }),
    )
    .query(async ({ input }) => {
      const matches = await prisma.match.findMany({
        where: {
          season: input.season,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const leaderboards: Leaderboards = {
        season: input.season,
        totalMatches: {
          total: matches.length,
          perDay: 0,
          days: 0,
        },
        places: [],
        // wins: [],
        // matches: [],
        // winRate: [],
        // rating: [],
      };

      if (matches.length === 0) {
        return leaderboards;
      }

      const firstMatch = matches[matches.length - 1];
      const lastMatch = matches[0];
      const days =
        (lastMatch.createdAt.getTime() - firstMatch.createdAt.getTime()) /
        1000 /
        60 /
        60 /
        24;

      leaderboards.totalMatches.perDay = Math.round(matches.length / days);
      leaderboards.totalMatches.days = days;

      const teams = await prisma.team.findMany({
        include: {
          meta: true,
        },
        where: {
          teamsize: 1,
        },
      });

      const unsortedTeamMeta: TeamWithMeta[] = [];
      for (const team of teams) {
        const seasonMeta = team.meta.find(meta => meta.season === input.season);
        if (!seasonMeta) {
          continue;
        }
        if (unsortedTeamMeta.find(t => t.name === team.name)) {
          continue;
        }
        unsortedTeamMeta.push(team);
      }

      leaderboards.places = [
        // Most wins
        ...unsortedTeamMeta
          .sort((a, b) => {
            const metaA = a.meta.find(meta => meta.season === input.season);
            const metaB = b.meta.find(meta => meta.season === input.season);
            if (!metaA || !metaB) {
              return 0;
            }
            return metaB.totalWins - metaA.totalWins;
          })
          .slice(0, 3)
          .map((team, index) => ({
            team: team.name,
            value:
              team.meta.find(meta => meta.season === input.season)?.totalWins ??
              0,
            place: index + 1,
            category: "wins" as const,
          })),

        // Highest score
        ...unsortedTeamMeta
          .sort((a, b) => {
            const metaA = a.meta.find(meta => meta.season === input.season);
            const metaB = b.meta.find(meta => meta.season === input.season);
            if (!metaA || !metaB) {
              return 0;
            }
            return metaB.totalScore - metaA.totalScore;
          })
          .slice(0, 3)
          .map((team, index) => ({
            team: team.name,
            value:
              team.meta.find(meta => meta.season === input.season)
                ?.totalScore ?? 0,
            place: index + 1,
            category: "score" as const,
          })),

        // Most matches
        ...unsortedTeamMeta
          .sort((a, b) => {
            const metaA = a.meta.find(meta => meta.season === input.season);
            const metaB = b.meta.find(meta => meta.season === input.season);
            if (!metaA || !metaB) {
              return 0;
            }
            return metaB.totalMatches - metaA.totalMatches;
          })
          .slice(0, 3)
          .map((team, index) => ({
            team: team.name,
            value:
              team.meta.find(meta => meta.season === input.season)
                ?.totalMatches ?? 0,
            place: index + 1,
            category: "matches" as const,
          })),

        // Highest win rate
        ...unsortedTeamMeta
          .sort((a, b) => {
            const metaA = a.meta.find(meta => meta.season === input.season);
            const metaB = b.meta.find(meta => meta.season === input.season);
            if (!metaA || !metaB) {
              return 0;
            }
            return metaB.totalWinRate - metaA.totalWinRate;
          })
          .slice(0, 3)
          .map((team, index) => ({
            team: team.name,
            value:
              team.meta.find(meta => meta.season === input.season)
                ?.totalWinRate ?? 0,
            place: index + 1,
            category: "winRate" as const,
          })),

        // Highest rating
        ...unsortedTeamMeta
          .sort((a, b) => {
            const metaA = a.meta.find(meta => meta.season === input.season);
            const metaB = b.meta.find(meta => meta.season === input.season);
            if (!metaA || !metaB) {
              return 0;
            }
            return metaB.rating - metaA.rating;
          })
          .slice(0, 3)
          .map((team, index) => ({
            team: team.name,
            value:
              team.meta.find(meta => meta.season === input.season)?.rating ?? 0,
            place: index + 1,
            category: "rating" as const,
          })),
      ];

      return leaderboards;
    }),
});
