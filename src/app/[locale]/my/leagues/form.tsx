"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { useFormState } from "react-dom";
import { createLeague } from "@/app/[locale]/my/leagues/actions";

export interface CreateLeagueFormValues {
  name: string;
  description: string;
  image: any;
}

function CreateLeagueFormFields({
  register,
}: {
  register: UseFormRegister<CreateLeagueFormValues>;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-gap-3 flex-col w-1/2">
        <Input
          type="file"
          label="Image"
          labelPlacement="outside"
          placeholder="Placeholder"
          variant="flat"
          {...register("image")}
        />
        <Input
          type="text"
          label="Name"
          labelPlacement="outside"
          placeholder="Placeholder"
          {...register("name")}
        />
        <Textarea
          label="Description"
          labelPlacement="outside"
          placeholder="Placeholder"
          {...register("description")}
        />
        <Button type="submit" color="primary">
          Create League
        </Button>
      </div>
      <div className="flex flex-gap-3 flex-col w-1/2">
        <Select
          label="Select"
          labelPlacement="outside"
          placeholder="Placeholder"
        >
          <SelectItem key="foo" value="fo">bar</SelectItem>
        </Select>
      </div>
    </div>
  );
}

export function CreateLeagueForm() {
  const { register } = useForm<CreateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });
  const [state, formAction] = useFormState(createLeague, null);

  return (
    <form action={formAction}>
      <CreateLeagueFormFields register={register} />
    </form>
  );
}
