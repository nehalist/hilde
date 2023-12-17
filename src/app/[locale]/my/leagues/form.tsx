"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { Control, Controller, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { useFormState } from "react-dom";
import { createLeague } from "@/app/[locale]/my/leagues/actions";
import { games } from "@/lib/games";

export interface CreateLeagueFormValues {
  name: string;
  description: string;
  image: any;
  game: string;
  maxScore: number;
  allowDraws: boolean;
  ratingSystem: string;
}

/**
 * elo
 *     defaultRating
 *     k factor
 *
 * glicko2
 *     defaultRating
 *     tau                 "Reasonable choices are between 0.3 and 1.2, though the system should be tested to decide which value results in greatest predictive accuracy."
 *     rd
 *     volatility
 */
function CreateLeagueFormFields({
  register,
  control,
}: {
  register: UseFormRegister<CreateLeagueFormValues>;
  control: Control<CreateLeagueFormValues>;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex gap-3 flex-col w-1/2">
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
      <div className="w-1/2">
        <div className="flex gap-3 flex-col">
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select
                label="Game"
                labelPlacement="outside"
                placeholder="Placeholder"
                defaultSelectedKeys={[value]}
                onChange={onChange}
                disallowEmptySelection={true}
              >
                {games.map(game => (
                  <SelectItem key={game.id} value={game.id}>
                    {game.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            name="game"
            control={control}
          />
          <div className="flex gap-3">
            <Input
              type="text"
              label="Max Score per match"
              labelPlacement="outside"
              placeholder="Placeholder"
              className="w-2/3"
              {...register("maxScore")}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <Checkbox onChange={onChange} isSelected={value}>Allow Draws</Checkbox>
              )}
              name="allowDraws"
              control={control}
            />
          </div>
          <Accordion variant="splitted">
            <AccordionItem title="Advanced" key="advanced">
              <Select
                label="Rating System"
                labelPlacement="outside"
                {...register("ratingSystem")}
              >
                <SelectItem key="elo" value="elo">
                  Elo
                </SelectItem>
                <SelectItem key="glicko2" value="glicko2">
                  Glicko2
                </SelectItem>
              </Select>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export function CreateLeagueForm() {
  const defaultGame = games.find(game => game.id === "custom")!;
  const { register, control } = useForm<CreateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
      game: defaultGame.id,
      maxScore: defaultGame.defaults.maxScore,
      allowDraws: defaultGame.defaults.allowDraws,
      ratingSystem: defaultGame.defaults.ratingSystem,
    },
  });
  const [state, formAction] = useFormState(createLeague, null);

  return (
    <form action={formAction}>
      <CreateLeagueFormFields register={register} control={control} />
    </form>
  );
}
