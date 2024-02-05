"use client";

import { League } from "@/db/schema";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useTranslations } from "next-intl";
import { Button, Divider } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import {
  closeLeagueAction,
  reopenLeagueAction,
} from "@/app/[locale]/my/leagues/[id]/actions";
import { useServerActionState } from "@/hooks/use-server-action-state";

function CloseLeagueButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="danger" size="lg" isLoading={pending}>
      Close League
    </Button>
  );
}

function CloseLeague({ league }: { league: League }) {
  const [state, formAction] = useFormState(closeLeagueAction, null);

  useServerActionState(state, {
    onSuccess: () => {
      return {
        message: "League closed",
      };
    },
  });

  return (
    <div>
      <p>
        Here you can close the league. This will make it read-only and prevent
        any further changes. You can always re-open it.
      </p>
      <form
        action={formAction}
        className="flex gap-3 mt-3"
        onSubmit={e => {
          if (!confirm(`Are you sure you want to CLOSE ${league.name}?`)) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="leagueId" value={league.id} />
        <CloseLeagueButton />
      </form>
    </div>
  );
}

function ReopenLeagueButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="warning" size="lg" isLoading={pending}>
      Re-open League
    </Button>
  );
}

function ReopenLeague({ league }: { league: League }) {
  const [state, formAction] = useFormState(reopenLeagueAction, null);

  useServerActionState(state, {
    onSuccess: () => {
      return {
        message: "League re-opened",
      };
    },
  });

  return (
    <div>
      <p>This league is currently closed.</p>
      <form
        action={formAction}
        className="flex gap-3 mt-3"
        onSubmit={e => {
          if (!confirm(`Are you sure you want to RE-OPEN ${league.name}?`)) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="leagueId" value={league.id} />
        <ReopenLeagueButton />
      </form>
    </div>
  );
}

export function LeagueStatus({ league }: { league: League }) {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <p className="text-md">Status</p>
          <p className="text-small text-default-500">
            {t("settings.description")}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {league.status === "active" ? (
          <CloseLeague league={league} />
        ) : (
          <ReopenLeague league={league} />
        )}
      </CardBody>
    </Card>
  );
}
