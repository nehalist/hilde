"use client";

import { League } from "@/db/schema";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { GameIcon } from "@/components/game-icon";
import { games } from "@/lib/games";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { leagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { CreateLeagueFormValues } from "@/app/[locale]/my/leagues/create/form";

export function LeagueSettings({ league }: { league: League }) {
  const t = useTranslations();
  const form = useForm<CreateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      name: league.name,
      description: league.description || "",
      game: league.game,
    },
  });

  return (
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
            className="mb-0"
            {...form.register("description")}
          />
          <Controller
            control={form.control}
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
            Rating system: {league.ratingSystem} (
            {JSON.stringify(league.ratingSystemParameters)})
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button type="submit" color="primary" isLoading={false}>
          {t("saveButtonLabel")}
        </Button>
      </CardFooter>
    </Card>
  );
}
