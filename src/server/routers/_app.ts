import { router } from "../trpc";
import { matchesRouter } from "~/server/routers/matches";
import { teamsRouter } from "~/server/routers/teams";
import { leaderboardsRouter } from "~/server/routers/leaderboards";

export const appRouter = router({
  matches: matchesRouter,
  teams: teamsRouter,
  leaderboards: leaderboardsRouter,
});

export type AppRouter = typeof appRouter;
