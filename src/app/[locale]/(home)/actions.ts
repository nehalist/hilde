"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { zfd } from "zod-form-data";
import { userIsInLeague } from "@/db/model/league";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const switchLeagueAction = createAuthenticatedServerAction(
  zfd.formData({
    leagueId: zfd.text(),
  }),
  async ({ leagueId }, { user }) => {
    if (!(await userIsInLeague(leagueId, user))) {
      return {
        status: "error",
        message: "You are not in this league.",
      };
    }

    await db
      .update(users)
      .set({ selectedLeagueId: leagueId })
      .where(eq(users.id, user.id));

    // TODO: maybe we should do a reload here
    revalidatePath("/");

    return {
      status: "success",
    };
  },
);
