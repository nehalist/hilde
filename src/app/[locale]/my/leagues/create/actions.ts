"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { validateRatingSystemParameters } from "@/lib/rating";
import { createLeague } from "@/db/model/league";

export const createLeagueAction = createAuthenticatedServerAction(
  leagueFormSchema,
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

    await createLeague(
      user,
      data.name,
      data.game,
      data.maxScorePerMatch,
      data.ratingSystem,
      data.defaultRating,
      data.ratingSystemParameters,
      data.description,
    );

    return {
      status: "success",
      data: {
        foo: "bar",
      },
    };
  },
);
