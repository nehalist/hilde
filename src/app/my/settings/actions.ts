"use server";

import { SettingsFormValues } from "@/app/my/settings/form";
import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/db";
import * as fs from "fs";

export async function updateUserProfile(data: SettingsFormValues) {
  const user = await getCurrentUser();
  if (!user) {
    return;
  }
  return prisma.user.update({
    data: {
      name: data.name,
      email: data.email,
    },
    where: {
      id: user.id,
    },
  });
}

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
