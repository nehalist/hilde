"use server";

import { updateLeagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import {
  getLeagueById,
  regenerateInviteCodeForLeague,
  removeUserFromLeague,
  updateLeague,
} from "@/db/model/league";
import { getUserById } from "@/db/model/user";
import { authAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const closeLeagueAction = authAction(
  z.object({
    leagueId: z.string(),
  }),
  async ({ leagueId }, { user }) => {
    const league = await getLeagueById(leagueId);
    if (!league || league.ownerId !== user.id) {
      return {
        status: "invalid league",
      };
    }

    await updateLeague(league, {
      status: "finished",
    });
    revalidatePath(`/my/leagues/[id]`);

    return {
      status: "success",
    };
  },
);

export const reopenLeagueAction = authAction(
  z.object({
    leagueId: z.string(),
  }),
  async ({ leagueId }, { user }) => {
    const league = await getLeagueById(leagueId);
    if (!league || league.ownerId !== user.id) {
      return {
        status: "error",
      };
    }

    await updateLeague(league, {
      status: "active",
    });
    revalidatePath(`/my/leagues/[id]`);

    return {
      status: "success",
    };
  },
);

export const regenerateInviteCodeAction = authAction(
  z.object({
    leagueId: z.string(),
  }),
  async ({ leagueId }, { user }) => {
    const league = await getLeagueById(leagueId);
    if (!league || league.ownerId !== user.id) {
      return {
        status: "error",
      };
    }

    await regenerateInviteCodeForLeague(league);
    revalidatePath(`/my/leagues/[id]`);

    return {
      status: "success",
    };
  },
);

export const updateLeagueAction = authAction(
  updateLeagueFormSchema,
  async (data, { user }) => {
    const league = await getLeagueById(data.leagueId);
    if (!league || league.ownerId !== user.id) {
      return {
        status: "error",
      };
    }

    await updateLeague(league, {
      name: data.name,
      description: data.description,
      game: data.game,
    });
    revalidatePath(`/my/leagues/[id]`);

    return {
      status: "success",
    };
  },
);

export const removeMembershipAction = authAction(
  z.object({
    leagueId: z.string(),
    userId: z.string(),
  }),
  async (data, { user }) => {
    const league = await getLeagueById(data.leagueId);
    const member = await getUserById(data.userId);

    if (!league || league.ownerId !== user.id || !member) {
      return {
        status: "error",
      };
    }

    await removeUserFromLeague(league.id, member);
    revalidatePath(`/my/leagues/[id]`);

    return {
      status: "success",
    };
  },
);
