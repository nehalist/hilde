"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { validateRatingSystemParameters } from "@/lib/rating";
import { uploadFile } from "@/lib/storage";
import { createLeague, updateLeague } from "@/db/model/league";

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

    const league = await createLeague(
      user,
      data.name,
      data.game,
      data.maxScorePerMatch,
      data.allowDraws,
      data.ratingSystem,
      data.defaultRating,
      data.ratingSystemParameters,
      data.description,
    );

    if (data.image) {
      const { fileName } = await uploadFile(
        data.image,
        `leagues/${league.id}-${+new Date()}`,
      );
      await updateLeague(league, { image: fileName });
    }

    return {
      status: "success",
      data: {
        foo: "bar",
      },
    };
  },
);
