"use client";

import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { useFormState, useFormStatus } from "react-dom";
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
import { useTranslations } from "next-intl";

export interface CreateLeagueFormValues {
  name: string;
  description: string;
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
  const t = useTranslations("my.leagues.create");
  const ratingSystem = ratingSystems.find(
    rs => rs.id === form.watch("ratingSystem"),
  );
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">{t("settings.title")}</p>
            <p className="text-small text-default-500">
              {t("settings.description")}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3 w-1/2">
            <Input
              type="name"
              label={t("settings.nameLabel")}
              placeholder={t("settings.namePlaceholder")}
              {...form.register("name")}
            />
            <Textarea
              type="name"
              label={t("settings.descriptionLabel")}
              {...form.register("description")}
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">{t("game.title")}</p>
            <p className="text-small text-default-500">
              {t("game.description")}
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
                  label={t("game.gameLabel")}
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
                  label={t("game.maxScorePerMatchLabel")}
                  className="w-1/2"
                  value={`${value}`}
                  onChange={onChange}
                  description={t("game.maxScorePerMatchDescription")}
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
                  {t("game.allowDrawsLabel")}
                </Checkbox>
              )}
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">{t("rating.title")}</p>
            <p className="text-small text-default-500">
              {t.rich("rating.description", {
                warning: text => <span className="text-red-600 font-bold">{text}</span>
              })}
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
                  label={t("rating.ratingSystemLabel")}
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
                  label={t("rating.defaultRatingLabel")}
                  className="w-1/2"
                  value={`${value}`}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {ratingSystem && ratingSystem.parameters && (
            <>
              <p className="text-sm">
                {t("rating.ratingSystemParametersDescription")}
              </p>
              <div className="flex gap-3">
                <input
                  type="hidden"
                  {...form.register("ratingSystemParameters")}
                />
                {ratingSystem.parameters.map(parameter => (
                  <Input
                    key={parameter.id}
                    type="number"
                    label={t(`rating.ratingSystemParameters.${parameter.id}`)}
                    className="w-1/3"
                    description={t(
                      `rating.ratingSystemParameters.${parameter.id}Description`,
                      { default: parameter.defaultValue },
                    )}
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
      <div className="text-right">
        <Button type="submit" color="primary" isLoading={pending}>
          {t("saveButtonLabel")}
        </Button>
      </div>
    </div>
  );
}

export function CreateLeagueForm() {
  const t = useTranslations("my.leagues.create");
  const defaultGame = games.find(game => game.id === "custom")!;
  const defaultRatingSystem = RatingSystem.Elo;
  const form = useForm<CreateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      name: "",
      description: "",
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
        message: t("toasts.success"),
        redirect: `/my/leagues`,
      };
    },
  });

  return (
    <form action={formAction}>
      <CreateLeagueFormFields form={form} />
    </form>
  );
}
