"use client";

import { Button } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { joinLeagueAction } from "@/app/[locale]/invite/actions";
import { League } from "@/db/schema";
import { useServerActionState } from "@/hooks/use-server-action-state";
import { useTranslations } from "next-intl";

interface InviteFormProps {
  league: League;
  code: string;
}

export function InviteForm({ league, code }: InviteFormProps) {
  const [state, formAction] = useFormState(joinLeagueAction, null);
  const t = useTranslations("invite");

  useServerActionState(state, {
    onError: state => {
      return state;
    },
  });

  return (
    <div className="max-w-xl mx-auto my-24">
      <form action={formAction}>
        <input type="hidden" name="leagueId" value={league.id} />
        <input type="hidden" name="code" value={code} />
        <div className="text-center flex justify-center flex-col">
          <span className="text-sm text-gray-500">{t("title")}</span>
          <h2 className="text-6xl font-bold">
            {league.name}
            <span className="text-sm block font-normal italic">
              {league.description || "No description"}
            </span>
          </h2>
          <div className="flex justify-center gap-3 mt-6">
            <Button type="submit" color="primary" className="w-64">
              {t("joinButtonLabel")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
