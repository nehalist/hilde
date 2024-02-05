"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { zfd } from "zod-form-data";
import { getLeagueById, regenerateInviteCodeForLeague, updateLeague } from "@/db/model/league";

export const closeLeagueAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
  }),
  async ({ leagueId }, { user }) => {
    const [league] = await getLeagueById(leagueId);
    if (league.ownerId !== user.id) {
      return {
        status: "error",
      }
    }

    await updateLeague(league, {
      status: "finished"

    });

    return {
      status: "success",
    }
  }
);

export const reopenLeagueAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
  }),
  async ({ leagueId }, { user }) => {
    const [league] = await getLeagueById(leagueId);
    if (league.ownerId !== user.id) {
      return {
        status: "error",
      }
    }

    await updateLeague(league, {
      status: "active"
    });

    return {
      status: "success",
    }
  }
);

export const regenerateInviteCodeAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
  }),
  async ({ leagueId }, { user }) => {
    const [league] = await getLeagueById(leagueId);
    if (league.ownerId !== user.id) {
      return {
        status: "error",
      }
    }

    await regenerateInviteCodeForLeague(league);

    return {
      status: "success",
    }
  }
);
