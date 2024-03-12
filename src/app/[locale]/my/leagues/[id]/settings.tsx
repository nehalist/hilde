"use client";

import { updateLeagueAction } from "@/app/[locale]/my/leagues/[id]/actions";
import { updateLeagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { GameIcon } from "@/components/game-icon";
import { League } from "@/db/schema";
import { games } from "@/lib/games";
import { ratingSystems } from "@/lib/rating";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
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

interface UpdateLeagueFormValues {
  name: string;
  description: string;
  game: string;
  leagueId: string;
}

export function LeagueSettings({ league }: { league: League }) {
  const { execute, status } = useAction(updateLeagueAction, {
    onSuccess: () => {
      toast("League joined", { type: "success" });
    },
    onError: () => {
      toast("Failed to join league", { type: "error" });
    },
  });
  const t = useTranslations();
  const {
    control,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<UpdateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(updateLeagueFormSchema),
    defaultValues: {
      name: league.name,
      description: league.description || "",
      game: league.game,
      leagueId: league.id,
    },
  });

  return (
    <form onSubmit={handleSubmit(data => execute(data))}>
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
              defaultValue={league.name}
              {...register("name")}
            />
            <Textarea
              type="name"
              label={t("settings.descriptionLabel")}
              className="mb-0"
              defaultValue={league.description || ""}
              {...register("description")}
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
                  className="w-full"
                  startContent={<GameIcon game={value} />}
                >
                  {games.map(game => (
                    <SelectItem key={game.id}>{game.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <div>
              <Select
                label={t("rating.ratingSystemLabel")}
                name="ratingSystem"
                defaultSelectedKeys={[league.ratingSystem]}
                isDisabled={true}
                className="w-1/2"
                description={Object.keys(
                  league.ratingSystemParameters as Record<string, number>,
                ).map(
                  rsp =>
                    `${rsp}: ${
                      (league.ratingSystemParameters as Record<string, number>)[
                        rsp as keyof typeof league.ratingSystemParameters
                      ]
                    }`,
                )}
              >
                {ratingSystems.map(rs => (
                  <SelectItem key={rs.id}>{rs.name}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            color="primary"
            isLoading={isExecuting(status)}
            isDisabled={!isValid}
          >
            {t("saveButtonLabel")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
