"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { zfd } from "zod-form-data";
import { getSelectedUserLeague, userIsInLeague } from "@/db/model/league";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getOrCreateTeam } from "@/db/model/team";
import { createMatch } from "@/db/model/match";

export const switchLeagueAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
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

export const createMatchAction = createAuthenticatedServerAction(
  zfd.formData({
    team1: zfd.text(),
    score1: zfd.numeric(),
    team2: zfd.text(),
    score2: zfd.numeric(),
  }),
  async ({ team1, score1, team2, score2 }, { user }) => {
    const selectedUserLeague = await getSelectedUserLeague();
    if (!selectedUserLeague) {
      return {
        status: "error",
      };
    }

    const team1Entity = await getOrCreateTeam(
      selectedUserLeague,
      team1,
      user.id,
    );
    const team2Entity = await getOrCreateTeam(
      selectedUserLeague,
      team2,
      user.id,
    );

    // TODO: check for duplicates

    await createMatch(
      selectedUserLeague,
      user,
      team1Entity,
      team2Entity,
      score1,
      score2,
    );

    revalidatePath("/");

    return {
      status: "success",
    };
  },
);
