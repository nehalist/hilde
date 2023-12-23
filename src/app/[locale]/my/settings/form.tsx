"use client";

import { useForm, UseFormRegister } from "react-hook-form";
import { updateUserProfile } from "@/app/[locale]/my/settings/actions";
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
  firstName: string;
  lastName: string;
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
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-300">
          Real name
        </h3>
        <p className="max-w-4xl text-sm text-gray-500">
          Optional, not public. This simply makes it easier for your team mates
          to find you when adding a match.
        </p>
      </div>
      <div className="flex gap-3">
        <Input
          type="name"
          label="First Name"
          defaultValue={user.firstName || ""}
          className="w-1/2"
          {...register("firstName")}
        />
        <Input
          type="name"
          label="Last Name"
          defaultValue={user.lastName || ""}
          className="w-1/2"
          {...register("lastName")}
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
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    },
  });
  const [state, formAction] = useFormState(updateUserProfile, null);

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
    <form className="flex flex-col gap-3 w-4/6" action={formAction}>
      <SettingsFormFields user={user} register={register} isValid={isValid} />
    </form>
  );
}
