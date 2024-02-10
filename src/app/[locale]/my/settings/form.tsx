"use client";

import { updateUserProfileAction } from "@/app/[locale]/my/settings/actions";
import { settingsFormSchema } from "@/app/[locale]/my/settings/validation";
import { User } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface SettingsFormValues {
  name: string;
}

export function SettingsForm({ user }: { user: User }) {
  const { update } = useSession();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<SettingsFormValues>({
    mode: "all",
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: user.name || "unknown",
    },
  });
  const { execute, status } = useAction(updateUserProfileAction, {
    onSuccess: () => {
      toast.success("Profile updated");
      update();
    },
    onError: () => {
      toast("Failed to update profile", { type: "error" });
    },
  });

  const onSubmit: SubmitHandler<SettingsFormValues> = data => execute(data);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3">
        <Input
          type="name"
          label="Username"
          defaultValue={user.name || ""}
          className="w-1/2"
          {...register("name")}
        />
        <Input
          type="email"
          label="Mail"
          isReadOnly={true}
          value={user.email || ""}
          className="w-1/2"
          isDisabled={true}
        />
      </div>
      <Button
        type="submit"
        color="primary"
        isLoading={isExecuting(status)}
        isDisabled={!isValid}
        fullWidth={false}
        className="w-64"
      >
        Update Profile
      </Button>
    </form>
  );
}
