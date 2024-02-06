"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { zfd } from "zod-form-data";
import {
  getLeagueById,
  regenerateInviteCodeForLeague,
  removeUserFromLeague,
  updateLeague,
} from "@/db/model/league";
import { updateLeagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { getUserById } from "@/db/model/user";

export const closeLeagueAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
  }),
  async ({ leagueId }, { user }) => {
    const [league] = await getLeagueById(leagueId);
    if (league.ownerId !== user.id) {
      return {
        status: "error",
      };
    }

    await updateLeague(league, {
      status: "finished",
    });

    return {
      status: "success",
    };
  },
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
      };
    }

    await updateLeague(league, {
      status: "active",
    });

    return {
      status: "success",
    };
  },
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
      };
    }

    await regenerateInviteCodeForLeague(league);

    return {
      status: "success",
    };
  },
);

export const updateLeagueAction = createAuthenticatedServerAction(
  updateLeagueFormSchema,
  async (data, { user }) => {
    const [league] = await getLeagueById(data.leagueId);
    if (league.ownerId !== user.id) {
      return {
        status: "error",
      };
    }

    await updateLeague(league, {
      name: data.name,
      description: data.description,
      game: data.game,
    });

    return {
      status: "success",
    };
  },
);

export const removeMembershipAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
    userId: zfd.text(),
  }),
  async (data, { user }) => {
    const [league] = await getLeagueById(data.leagueId);
    const member = await getUserById(data.userId);

    if (league.ownerId !== user.id || !member) {
      return {
        status: "error",
      };
    }

    await removeUserFromLeague(league.id, member);

    return {
      status: "success",
    };
  },
);
