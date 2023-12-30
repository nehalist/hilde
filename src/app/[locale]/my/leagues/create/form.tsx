"use client";

import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { useFormState } from "react-dom";
import { createLeagueAction } from "@/app/[locale]/my/leagues/create/actions";
import { games } from "@/lib/games";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  getDefaultRatingSystemParameters,
  RatingSystem,
  ratingSystems,
} from "@/lib/rating";
import { useServerActionState } from "@/hooks/use-server-action-state";

export interface CreateLeagueFormValues {
  name: string;
  description: string;
  image: any;
  game: string;
  maxScorePerMatch: number;
  allowDraws: boolean;
  ratingSystem: string;
  defaultRating: number;
  ratingSystemParameters: string;
}

function CreateLeagueFormFields({
  form,
}: {
  form: UseFormReturn<CreateLeagueFormValues>;
}) {
  const ratingSystem = ratingSystems.find(
    rs => rs.id === form.watch("ratingSystem"),
  );

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">League</p>
            <p className="text-small text-default-500">
              General information regarding your new league
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3 w-1/2">
            <Input
              type="file"
              label="Image"
              labelPlacement="outside"
              placeholder="Placeholder"
              variant="flat"
              {...form.register("image")}
            />
            <Input type="name" label="Name" {...form.register("name")} />
            <Textarea
              type="name"
              label="Description"
              {...form.register("description")}
            />
          </div>
        </CardBody>
      </Card>
      --- optional settings ---
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">Game</p>
            <p className="text-small text-default-500">
              The game that will be played in your new league
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex gap-3">
          <div className="flex gap-3">
            <Controller
              control={form.control}
              name="game"
              render={({ field: { onChange, value } }) => (
                <Select
                  disallowEmptySelection={true}
                  label="Game"
                  name="game"
                  selectedKeys={[value]}
                  onChange={e => {
                    onChange(e);
                    const game = games.find(game => game.id === e.target.value);
                    if (!game) {
                      return;
                    }
                    form.setValue(
                      "maxScorePerMatch",
                      game.defaults.maxScorePerMatch,
                    );
                    form.setValue("allowDraws", game.defaults.allowDraws);
                  }}
                >
                  {games.map(game => (
                    <SelectItem key={game.id}>{game.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              control={form.control}
              name="maxScorePerMatch"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  name="maxScorePerMatch"
                  label="Max score per match"
                  className="w-1/2"
                  value={`${value}`}
                  onChange={onChange}
                  description="Set to 0 for no limit. You can still add matches with higher scores, it's just for convenience."
                />
              )}
            />
            <Controller
              control={form.control}
              name="allowDraws"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  name="allowDraws"
                  isSelected={value}
                  value="on"
                  className="w-64"
                  onChange={onChange}
                >
                  Allow draws
                </Checkbox>
              )}
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">Rating</p>
            <p className="text-small text-default-500">
              The rating system used for your new league
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex gap-3">
          <div className="flex gap-3">
            <Controller
              control={form.control}
              name="ratingSystem"
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Rating System"
                  name="ratingSystem"
                  defaultSelectedKeys={[value]}
                  disallowEmptySelection={true}
                  className="w-1/2"
                  onChange={e => {
                    onChange(e);
                    const ratingSystem = ratingSystems.find(
                      rs => rs.id === e.target.value,
                    );
                    if (!ratingSystem) {
                      return;
                    }
                    form.setValue(
                      "ratingSystemParameters",
                      JSON.stringify(
                        getDefaultRatingSystemParameters(ratingSystem.id),
                      ),
                    );
                  }}
                >
                  {ratingSystems.map(rs => (
                    <SelectItem key={rs.id}>{rs.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              control={form.control}
              name="defaultRating"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  name="defaultRating"
                  label="Default rating"
                  className="w-1/2"
                  value={`${value}`}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {ratingSystem && ratingSystem.parameters && (
            <>
              <p className="text-sm">Rating System Parameters</p>
              <div className="flex gap-3">
                <input
                  type="hidden"
                  {...form.register("ratingSystemParameters")}
                />
                {ratingSystem.parameters.map(parameter => (
                  <Input
                    key={parameter.id}
                    type="number"
                    label={parameter.name}
                    className="w-1/3"
                    description={parameter.description}
                    defaultValue={parameter.defaultValue}
                    onValueChange={value => {
                      form.setValue(
                        "ratingSystemParameters",
                        JSON.stringify({
                          ...JSON.parse(
                            form.getValues("ratingSystemParameters") as string,
                          ),
                          [parameter.id]: value,
                        }),
                      );
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </CardBody>
      </Card>
      <Button type="submit">Save</Button>
    </div>
  );
}

export async function CreateLeagueForm() {
  const defaultGame = games.find(game => game.id === "custom")!;
  const defaultRatingSystem = RatingSystem.Elo;
  const form = useForm<CreateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
      game: defaultGame.id,
      maxScorePerMatch: defaultGame.defaults.maxScorePerMatch,
      allowDraws: defaultGame.defaults.allowDraws,
      defaultRating: 1000,
      ratingSystem: defaultRatingSystem,
      ratingSystemParameters: JSON.stringify(
        getDefaultRatingSystemParameters(defaultRatingSystem),
      ),
    },
  });
  const [state, formAction] = useFormState(createLeagueAction, null);

  useServerActionState(state, {
    onSuccess: () => {
      return {
        message: "League created",
        redirect: `/my/leagues`,
      }
    }
  });

  return (
    <form action={formAction}>
      <CreateLeagueFormFields form={form} />
    </form>
  );
}
