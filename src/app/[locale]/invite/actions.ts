"use server";

import {
  createMembership,
  getLeagueByInviteCode,
  userIsInLeague,
} from "@/db/model/league";
import { updateUser } from "@/db/model/user";
import { authAction } from "@/lib/safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const joinLeagueAction = authAction(
  z.object({
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
      selectedLeagueId: league.id,
    });

    return {
      status: "success",
    };
  },
);
