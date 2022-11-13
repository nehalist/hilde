import { router } from "../trpc";
import { matchesRouter } from "~/server/routers/matches";
import { teamsRouter } from "~/server/routers/teams";

export const appRouter = router({
  matches: matchesRouter,
  teams: teamsRouter,
});

export type AppRouter = typeof appRouter;
