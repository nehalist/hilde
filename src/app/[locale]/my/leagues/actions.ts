"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import prisma from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const createLeague = createAuthenticatedServerAction(
  leagueFormSchema,
  async ({ image, name, description }, { user }) => {
    const league = await prisma.league.create({
      data: {
        name,
        description,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    revalidatePath("/[locale]/my/leagues");

    return {
      status: "success",
    };
  },
);
