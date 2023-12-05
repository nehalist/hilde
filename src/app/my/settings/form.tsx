"use client";

import { useForm } from "react-hook-form";
import { updateUserProfile } from "@/app/my/settings/actions";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

export interface SettingsFormValues {
  name: string;
  firstName: string;
  lastName: string;
  prefix: string;
  suffix: string;
  email: string;
}

export function SettingsForm({ user }: { user: User }) {
  const [isPending, startTransaction] = useTransition();
  const { update } = useSession();
  const { register, handleSubmit } = useForm<SettingsFormValues>({
    mode: "all",
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    startTransaction(async () => {
      await updateUserProfile(values);
      await update();
      toast("Settings updated!", { type: "success" });
    });
  };

  return (
    <form
      className="flex flex-col gap-3 w-4/6"
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
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
        <h3 className="text-base font-semibold leading-6 text-gray-900">
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
          className="w-1/2"
          {...register("firstName")}
        />
        <Input
          type="name"
          label="Last Name"
          className="w-1/2"
          {...register("lastName")}
        />
      </div>
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Title
        </h3>
        <p className="max-w-4xl text-sm text-gray-500">
          This can be changed individually for every team you are a member of.
        </p>
      </div>
      <div className="flex gap-3">
        <Select label="Prefix" className="w-1/2" {...register("prefix")}>
          <SelectItem key="foo" value="foo">
            foo
          </SelectItem>
        </Select>
        <Select label="Suffix" className="w-1/2" {...register("prefix")}>
          <SelectItem key="bar" value="bar">
            bar
          </SelectItem>
        </Select>
      </div>
      <Button
        type="submit"
        color="primary"
        isLoading={isPending}
        fullWidth={false}
        className="w-64"
      >
        Update Profile
      </Button>
    </form>
  );
}
