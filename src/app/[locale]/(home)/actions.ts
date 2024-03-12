"use server";

import { matchCreationSchema } from "@/app/[locale]/(home)/validation";
import { db } from "@/db";
import { getSelectedUserLeague, userIsInLeague } from "@/db/model/league";
import { createMatch } from "@/db/model/match";
import { getOrCreateTeam } from "@/db/model/team";
import { users } from "@/db/schema";
import { authAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const switchLeagueAction = authAction(
  z.object({
    leagueId: z.string(),
  }),
  async ({ leagueId }, { user }) => {
    if (!(await userIsInLeague(leagueId, user))) {
      return {
        status: "error",
        message: "You are not in this league.",
      };
    }

    await db
      .update(users)
      .set({ selectedLeagueId: leagueId })
      .where(eq(users.id, user.id));

    // TODO: maybe we should do a reload here
    revalidatePath("/");

    return {
      status: "success",
    };
  },
);

export const createMatchAction = authAction(
  matchCreationSchema,
  async ({ team1, score1, team2, score2, comment }, { user }) => {
    const selectedUserLeague = await getSelectedUserLeague();
    if (!selectedUserLeague) {
      return {
        failure: "invalid user league",
      };
    }

    const team1Entity = await getOrCreateTeam(
      selectedUserLeague,
      team1.join(","),
      user.id,
    );
    const team2Entity = await getOrCreateTeam(
      selectedUserLeague,
      team2.join(","),
      user.id,
    );

    // TODO: check for duplicates

    const match = await createMatch(
      selectedUserLeague,
      user,
      team1Entity,
      team2Entity,
      score1,
      score2,
      comment,
    );

    revalidatePath("/");

    return {
      match,
    };
  },
);
