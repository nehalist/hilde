"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { createLeagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { validateRatingSystemParameters } from "@/lib/rating";
import { createLeague } from "@/db/model/league";
import { updateUser } from "@/db/model/user";

export const createLeagueAction = createAuthenticatedServerAction(
  createLeagueFormSchema,
  async (data, { user }) => {
    // TODO: This should be part of the schema
    if (
      !validateRatingSystemParameters(
        data.ratingSystem,
        data.ratingSystemParameters,
      )
    ) {
      return {
        status: "error" as const,
      };
    }

    const league = await createLeague(
      user,
      data.name,
      data.game,
      data.ratingSystem,
      data.defaultRating,
      data.ratingSystemParameters,
      data.description,
    );

    await updateUser(user.id, {
      selectedLeagueId: league.id,
    });

    return {
      status: "success",
    };
  },
);
