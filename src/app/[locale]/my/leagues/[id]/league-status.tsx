"use client";

import {
  closeLeagueAction,
  reopenLeagueAction,
} from "@/app/[locale]/my/leagues/[id]/actions";
import { League } from "@/db/schema";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { toast } from "react-toastify";

function CloseLeague({ league }: { league: League }) {
  const { execute, status } = useAction(closeLeagueAction, {
    onSuccess: () => {
      toast("League closed", { type: "success" });
    },
    onError: () => {
      toast("Failed to closed league", { type: "error" });
    },
  });

  return (
    <div>
      <p>
        Here you can close the league. This will make it read-only and prevent
        any further changes. You can always re-open it.
      </p>
      <Button
        type="submit"
        color="danger"
        size="lg"
        isLoading={isExecuting(status)}
        onClick={() => {
          if (!confirm(`Are you sure you want to CLOSE ${league.name}?`)) {
            return;
          }
          execute({ leagueId: league.id });
        }}
      >
        Close League
      </Button>
    </div>
  );
}

function ReopenLeague({ league }: { league: League }) {
  const { execute, status } = useAction(reopenLeagueAction, {
    onSuccess: () => {
      toast("League re-opened", { type: "success" });
    },
    onError: () => {
      toast("Failed to re-open league", { type: "error" });
    },
  });

  return (
    <div>
      <p>This league is currently closed.</p>
      <input type="hidden" name="leagueId" value={league.id} />
      <Button
        type="submit"
        color="warning"
        size="lg"
        isLoading={isExecuting(status)}
        onClick={() => {
          if (!confirm(`Are you sure you want to RE-OPEN ${league.name}?`)) {
            return;
          }
          execute({ leagueId: league.id });
        }}
      >
        Re-open League
      </Button>
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
