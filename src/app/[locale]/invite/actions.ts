"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { zfd } from "zod-form-data";
import {
  createMembership,
  getLeagueByInviteCode,
  userIsInLeague,
} from "@/db/model/league";
import { updateUser } from "@/db/model/user";

export const joinLeagueAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
    code: zfd.text(),
  }),
  async ({ leagueId, code }, { user }) => {
    const [league] = await getLeagueByInviteCode(code);
    if (!league) {
      return {
        status: "error",
        message: "League not found",
      };
    }
    if (league.inviteCode !== code) {
      return {
        status: "error",
        message: "Invalid invite code",
      };
    }
    if (await userIsInLeague(leagueId, user)) {
      return {
        status: "error",
        message: "You are already in this league",
      };
    }

    await createMembership(league, user);
    await updateUser(user.id, {
      selectedLeagueId: league.id
    });

    return {
      status: "success",
    };
  },
);
