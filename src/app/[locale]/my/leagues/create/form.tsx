"use client";

import { createLeagueAction } from "@/app/[locale]/my/leagues/create/actions";
import { createLeagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { GameIcon } from "@/components/game-icon";
import { games } from "@/lib/games";
import { useRouter } from "@/lib/navigation";
import {
  getDefaultRatingSystemParameters,
  RatingSystem,
  ratingSystems,
} from "@/lib/rating";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface CreateLeagueFormValues {
  name: string;
  description: string;
  game: string;
  ratingSystem: RatingSystem;
  defaultRating: number;
  ratingSystemParameters: Record<string, unknown>;
}

export function CreateLeagueForm() {
  const t = useTranslations("my.leagues.create");
  const defaultGame = games.find(game => game.id === "custom")!;
  const defaultRatingSystem = RatingSystem.Elo;
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<CreateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(createLeagueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      game: defaultGame.id,
      defaultRating: 1000,
      ratingSystem: defaultRatingSystem,
      ratingSystemParameters:
        getDefaultRatingSystemParameters(defaultRatingSystem),
    },
  });
  const router = useRouter();
  const { execute, status } = useAction(createLeagueAction, {
    onSuccess: () => {
      toast("League created", { type: "success" });
      router.push("/my/leagues");
    },
    onError: () => {
      toast("Failed to create league", { type: "error" });
    },
  });
  const ratingSystem = ratingSystems.find(
    rs => rs.id === watch("ratingSystem"),
  );

  return (
    <form onSubmit={handleSubmit(data => execute(data))}>
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
                {...register("name")}
              />
              <Textarea
                type="name"
                label={t("settings.descriptionLabel")}
                {...register("description")}
                className="mb-0"
              />
              <Controller
                control={control}
                name="game"
                render={({ field: { onChange, value } }) => (
                  <Select
                    disallowEmptySelection={true}
                    label={t("game.gameLabel")}
                    name="game"
                    selectedKeys={[value]}
                    onChange={onChange}
                    className="w-1/2"
                    startContent={<GameIcon game={value} />}
                  >
                    {games.map(game => (
                      <SelectItem key={game.id}>{game.name}</SelectItem>
                    ))}
                  </Select>
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
                  warning: text => (
                    <span className="text-red-600 font-bold">{text}</span>
                  ),
                })}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex gap-3">
            <div className="flex gap-3">
              <Controller
                control={control}
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
                      setValue(
                        "ratingSystemParameters",
                        getDefaultRatingSystemParameters(ratingSystem.id),
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
                control={control}
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
                    {...register("ratingSystemParameters")}
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
                      defaultValue={`${parameter.defaultValue}`}
                      onValueChange={value => {
                        setValue("ratingSystemParameters", {
                          ...getValues("ratingSystemParameters"),
                          [parameter.id]: value,
                        });
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </CardBody>
        </Card>
        <div className="text-right">
          <Button
            type="submit"
            color="primary"
            isLoading={isExecuting(status)}
            isDisabled={!isValid}
          >
            {t("saveButtonLabel")}
          </Button>
        </div>
      </div>
    </form>
  );
}
