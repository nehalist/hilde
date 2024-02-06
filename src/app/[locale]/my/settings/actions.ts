"use server";

import { createAuthenticatedServerAction } from "@/utils/server-action-helper";
import { settingsFormSchema } from "@/app/[locale]/my/settings/validation";
import { updateUser } from "@/db/model/user";

export const updateUserProfileAction = createAuthenticatedServerAction(
  settingsFormSchema,
  async ({ name }, { user }) => {
    await updateUser(user.id, { name });

    return {
      status: "success",
    };
  },
);
