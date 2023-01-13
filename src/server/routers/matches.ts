import { publicProcedure, router } from "~/server/trpc";
import { prisma } from "~/server/prisma";
import { z } from "zod";
import { getOrCreateTeam } from "~/server/model/team";
import { createMatch } from "~/server/model/match";
import { getCurrentSeason } from "~/utils/season";
import { matchAddValidation } from "~/validation/match";

export const matchesRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(0).max(100).default(50),
        team1: z.string().optional(),
        team2: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      let where = {};

      if (input.team1) {
        where = !input.team2
          ? { OR: [{ team1: input.team1 }, { team2: input.team1 }] }
          : {
              OR: [
                {
                  team1: input.team1,
                  team2: input.team2,
                },
                {
                  team1: input.team2,
                  team2: input.team1,
                },
              ],
            };
      }

      return await prisma.match.findMany({
        take: input.limit > 0 ? input.limit : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          achievements: true,
        },
        where: {
          ...where,
          season: getCurrentSeason(),
        },
      });
    }),

  infiniteList: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.number().nullish(),
        team1: z.string().optional(),
        team2: z.string().optional(),
        exact: z.boolean().optional(),
      }),
    )
    .query(async ({ input }) => {
      let where = {};
      if (input.team1 && !input.team2) {
        where = {
          OR: [
            {
              team1: input.exact ? input.team1 : { contains: input.team1 },
            },
            {
              team2: input.exact ? input.team1 : { contains: input.team1 },
            },
          ],
        };
      }
      if (input.team1 && input.team2) {
        where = {
          OR: [
            {
              team1: input.exact
                ? input.team1
                : {
                    contains: input.team1,
                  },
              team2: input.exact
                ? input.team2
                : {
                    contains: input.team2,
                  },
            },
            {
              team1: input.exact
                ? input.team2
                : {
                    contains: input.team2,
                  },
              team2: input.exact
                ? input.team1
                : {
                    contains: input.team1,
                  },
            },
          ],
        };
      }

      const items = await prisma.match.findMany({
        take: input.limit + 1,
        where: {
          ...where,
          season: getCurrentSeason(),
        },
        include: {
          achievements: true,
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  add: publicProcedure.input(matchAddValidation).mutation(async ({ input }) => {
    const team1 = await getOrCreateTeam(input.team1);
    const team2 = await getOrCreateTeam(input.team2);

    return await createMatch(
      team1,
      team2,
      input.score1,
      input.score2,
      input.comment,
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
