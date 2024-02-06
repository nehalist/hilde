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
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { GameIcon } from "@/components/game-icon";
import { games } from "@/lib/games";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLeagueFormSchema } from "@/app/[locale]/my/leagues/validation";
import { ratingSystems } from "@/lib/rating";
import { updateLeagueAction } from "@/app/[locale]/my/leagues/[id]/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useServerActionState } from "@/hooks/use-server-action-state";

interface UpdateLeagueFormValues {
  name: string;
  description: string;
  game: string;
}

function UpdateLeagueForm({
  league,
  form
}: {
  league: League;
  form: UseFormReturn<UpdateLeagueFormValues>;
}) {
  const t = useTranslations();
  const { pending } = useFormStatus();

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
        <input type="hidden" name="leagueId" value={league.id} />
        <Button type="submit" color="primary" isLoading={pending}>
          {t("saveButtonLabel")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function LeagueSettings({ league }: { league: League }) {
  const form = useForm<UpdateLeagueFormValues>({
    mode: "all",
    resolver: zodResolver(updateLeagueFormSchema),
    defaultValues: {
      name: league.name,
      description: league.description || "",
      game: league.game,
    },
  });
  const [state, formAction] = useFormState(updateLeagueAction, null);

  useServerActionState(state, {
    onSuccess: () => {
      return {
        message: "League updated",
        redirect: `/my/leagues`,
      };
    },
  });

  return (
    <form action={formAction}>
      <UpdateLeagueForm league={league} form={form} />
    </form>
  );
}
