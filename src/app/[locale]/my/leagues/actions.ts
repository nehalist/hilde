"use server";

import { db } from "@/db";
import { memberships } from "@/db/schema";
import { authAction } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const leaveLeagueAction = authAction(
  z.object({
    leagueId: z.string(),
  }),
  async ({ leagueId }, { user }) => {
    const membership = await db.query.memberships.findFirst({
      where: and(
        eq(memberships.leagueId, leagueId),
        eq(memberships.userId, user.id),
      ),
    });

    if (!membership) {
      return {
        error: "You are not in this league.",
      };
    }

    await db
      .delete(memberships)
      .where(
        and(
          eq(memberships.leagueId, leagueId),
          eq(memberships.userId, user.id),
        ),
      );

    return {
      status: "success",
    };
  },
);
