"use server";

import { createLeagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { createLeague } from "@/db/model/league";
import { updateUser } from "@/db/model/user";
import { validateRatingSystemParameters } from "@/lib/rating";
import { authAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const createLeagueAction = authAction(
  createLeagueFormSchema,
  async (data, { user }) => {
    // TODO: This should be part of the schema
    if (
      !validateRatingSystemParameters(
        data.ratingSystem,
        data.ratingSystemParameters,
      )
    ) {
      throw new Error("invalid rating system parameters");
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

    revalidatePath("/my/leagues");

    return {
      status: "success",
    };
  },
);
