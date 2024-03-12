"use server";

import { settingsFormSchema } from "@/app/[locale]/my/settings/validation";
import { updateUser } from "@/db/model/user";
import { authAction } from "@/lib/safe-action";

export const updateUserProfileAction = authAction(
  settingsFormSchema,
  async ({ name }, { user }) => {
    await updateUser(user.id, { name });

    return {
      status: "success",
    };
  },
);
