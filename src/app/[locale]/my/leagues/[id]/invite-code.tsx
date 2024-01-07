"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Button, Snippet } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { defaultLocale } from "@/i18n";
import { League } from "@/db/schema";
import { regenerateInviteCodeAction } from "@/app/[locale]/my/leagues/[id]/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useServerActionState } from "@/hooks/use-server-action-state";
import { useState } from "react";

function RegenerateButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      color="danger"
      isLoading={pending}
      onClick={e => {
        if (
          confirm(
            "Are you sure you want to regenerate the invite code? This INVALIDATES all previous invite links.",
          )
        ) {
          return true;
        }
        e.preventDefault();
        return false;
      }}
    >
      Regenerate
    </Button>
  );
}

export function InviteCode({ league }: { league: League }) {
  const locale = useLocale();
  const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${
    locale !== defaultLocale ? `${locale}/` : ``
  }invite?code=${league.inviteCode}`;
  const [state, formAction] = useFormState(regenerateInviteCodeAction, null);
  const [regenerated, setRegenerated] = useState(false);

  useServerActionState(state, {
    onSuccess: state => {
      setRegenerated(true);
      return state;
    },
  });

  return (
    <Card>
      <CardBody>
        <p>To add new users to this league, send them the following link:</p>
        <form action={formAction}>
          <input type="hidden" name="leagueId" value={league.id} />
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
            {!regenerated && <RegenerateButton />}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
