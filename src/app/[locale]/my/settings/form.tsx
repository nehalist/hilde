"use client";

import { useForm, UseFormRegister } from "react-hook-form";
import { updateUserProfileAction } from "@/app/[locale]/my/settings/actions";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsFormSchema } from "@/app/[locale]/my/settings/validation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { User } from "@/db/schema";

export interface SettingsFormValues {
  name: string;
}

function SettingsFormFields({
  user,
  register,
  isValid,
}: {
  user: User;
  register: UseFormRegister<SettingsFormValues>;
  isValid: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <>
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
        isLoading={pending}
        isDisabled={!isValid}
        fullWidth={false}
        className="w-64"
      >
        Update Profile
      </Button>
    </>
  );
}

export function SettingsForm({ user }: { user: User }) {
  const { update } = useSession();
  const {
    register,
    formState: { isValid },
  } = useForm<SettingsFormValues>({
    mode: "all",
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: user.name || "",
    },
  });
  const [state, formAction] = useFormState(updateUserProfileAction, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    switch (state.status) {
      case "success":
        update();
        toast("Profile updated.", {
          type: "success",
        });
        break;
      case "error":
        toast(state.message, {
          type: "error",
        });
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-3" action={formAction}>
      <SettingsFormFields user={user} register={register} isValid={isValid} />
    </form>
  );
}
