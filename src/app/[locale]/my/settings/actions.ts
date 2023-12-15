"use server";

import prisma from "@/lib/db";
import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import {
  imageFormSchema,
  settingsFormSchema,
} from "@/app/[locale]/my/settings/validation";
import { removeUploadedFiles, uploadFile } from "@/lib/storage";

export const updateUserProfile = createAuthenticatedServerAction(
  settingsFormSchema,
  async ({ name, firstName, lastName }, { user }) => {
    await prisma.user.update({
      data: {
        name,
        firstName,
        lastName,
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

export const updateUserImage = createAuthenticatedServerAction(
  imageFormSchema,
  async ({ image }, { user }) => {
    if (!image) {
      await removeUploadedFiles(`avatars/${user.id}-*`);

      await prisma.user.update({
        data: {
          image: null,
        },
        where: {
          id: user.id,
        },
      });
      return {
        status: "success",
      };
    }
    try {
      await removeUploadedFiles(`avatars/${user.id}-*`);
      const { fileName } = await uploadFile(image, `avatars/${user.id}-${+new Date()}`);

      await prisma.user.update({
        data: {
          image: fileName,
        },
        where: {
          id: user.id,
        },
      });

      return {
        status: "success",
      };
    } catch (e) {
      console.error(e);
      return {
        status: "error",
        message: "Failed to upload avatar",
      };
    }
  },
);
