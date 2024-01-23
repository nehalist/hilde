"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { db } from "@/db";
import { teams } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const leaveLeagueAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(z.string()),
  }),
  async (data, { user }) => {
    // const memberships = await db
    //   .select()
    //   .from(teamMembers)
    //   .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    //   .where(
    //     and(eq(teams.leagueId, data.leagueId), eq(teamMembers.userId, user.id)),
    //   );
    //
    // for await (const membership of memberships) {
    //   if (membership.team && membership.team.id) {
    //     await db.delete(teams).where(eq(teams.id, membership.team.id));
    //   }
    // }

    return {
      status: "success",
    };
  },
);
