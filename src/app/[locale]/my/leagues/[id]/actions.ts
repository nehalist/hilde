"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { zfd } from "zod-form-data";
import { getLeagueById, regenerateInviteCodeForLeague } from "@/db/model/league";

export const regenerateInviteCodeAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
  }),
  async ({ leagueId }, { user }) => {
    const [league] = await getLeagueById(leagueId);
    if (league.ownerId !== user.id) {
      return {
        status: "error",
        message: "You are not the owner of this league.",
      }
    }

    await regenerateInviteCodeForLeague(league);

    return {
      status: "success",
    }
  }
);
