"use client";

import { regenerateInviteCodeAction } from "@/app/[locale]/my/leagues/[id]/actions";
import { League } from "@/db/schema";
import { defaultLocale } from "@/i18n";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Divider, Snippet } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { useState } from "react";
import { toast } from "react-toastify";

export function InviteCode({ league }: { league: League }) {
  const locale = useLocale();
  const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${
    locale !== defaultLocale ? `${locale}/` : ``
  }invite?code=${league.inviteCode}`;
  const { execute, status } = useAction(regenerateInviteCodeAction, {
    onSuccess: () => {
      toast("Code regenerated", { type: "success" });
      setRegenerated(true);
    },
    onError: () => {
      toast("Failed to regenerate code", { type: "error" });
    },
  });
  const [regenerated, setRegenerated] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <p className="text-md">Invite Code</p>
          <p className="text-small text-default-500">
            Send this link to invite users to your league.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex gap-2 my-2">
          <Snippet
            symbol=""
            size="lg"
            classNames={{
              base: "flex-1",
              content: "w-full",
              pre: "w-full",
            }}
          >
            {inviteUrl}
          </Snippet>
          {!regenerated && (
            <Button
              type="submit"
              size="lg"
              color="danger"
              isLoading={isExecuting(status)}
              onClick={e => {
                if (
                  !confirm(
                    "Are you sure you want to regenerate the invite code? This INVALIDATES all previous invite links.",
                  )
                ) {
                  return false;
                }
                execute({ leagueId: league.id });
              }}
            >
              Regenerate
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
