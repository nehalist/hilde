"use server";

import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/db";
import * as fs from "fs";
import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { settingsFormSchema } from "@/app/[locale]/my/settings/validation";

export const updateUserProfile = createAuthenticatedServerAction(
  settingsFormSchema,
  async ({ name, firstName, lastName }, { user }) => {
    await prisma.user.update({
      data: {
        name,
        firstName,
        lastName
      },
      where: {
        id: user.id,
      },
    });

    return {
      status: "success",
    };
  },
);

export async function updateUserImage(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return;
  }
  if (!formData.has("avatar")) {
    return prisma.user.update({
      data: {
        image: null,
      },
      where: {
        id: user.id,
      },
    });
  }
  const file = formData.get("avatar") as File;
  const data = await file.arrayBuffer();
  const avatarFileName = `${user.id}.${file.name.split(".").pop()}`;
  const path = `./public/avatars/${avatarFileName}`;

  fs.writeFileSync(path, Buffer.from(data));

  return prisma.user.update({
    data: {
      image: `${process.env.NEXTAUTH_URL}/avatars/${avatarFileName}`,
    },
    where: {
      id: user.id,
    },
  });
}
