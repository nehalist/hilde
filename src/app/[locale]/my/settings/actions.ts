"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import {
  imageFormSchema,
  settingsFormSchema,
} from "@/app/[locale]/my/settings/validation";
import { removeUploadedFiles, uploadFile } from "@/lib/storage";
import { updateUser } from "@/db/model/user";

export const updateUserProfileAction = createAuthenticatedServerAction(
  settingsFormSchema,
  async ({ name, firstName, lastName }, { user }) => {
    await updateUser(user.id, { name, firstName, lastName });

    return {
      status: "success",
    };
  },
);

export const updateUserImageAction = createAuthenticatedServerAction(
  imageFormSchema,
  async ({ image }, { user }) => {
    if (!image) {
      await removeUploadedFiles(`avatars/${user.id}-*`);
      await updateUser(user.id, { image: null });

      return {
        status: "success",
      };
    }
    try {
      await removeUploadedFiles(`avatars/${user.id}-*`);
      const { fileName } = await uploadFile(
        image,
        `avatars/${user.id}-${+new Date()}`,
      );

      await updateUser(user.id, { image: fileName });

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
