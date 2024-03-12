"use client";

import { joinLeagueAction } from "@/app/[locale]/invite/actions";
import { League } from "@/db/schema";
import { useRouter } from "@/lib/navigation";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { toast } from "react-toastify";

interface InviteFormProps {
  league: League;
  code: string;
}

export function InviteForm({ league, code }: InviteFormProps) {
  const router = useRouter();
  const { execute, status } = useAction(joinLeagueAction, {
    onSuccess: () => {
      toast("League joined", { type: "success" });
      router.push("/");
    },
    onError: () => {
      toast("Failed to join league", { type: "error" });
    },
  });
  const t = useTranslations("invite");

  return (
    <div className="max-w-xl mx-auto my-24">
      <div className="text-center flex justify-center flex-col">
        <span className="text-sm text-gray-500">{t("title")}</span>
        <h2 className="text-6xl font-bold">
          {league.name}
          <span className="text-sm block font-normal italic">
            {league.description || "No description"}
          </span>
        </h2>
        <div className="flex justify-center gap-3 mt-6">
          <Button
            type="submit"
            color="primary"
            className="w-64"
            isLoading={isExecuting(status)}
            onClick={() => {
              execute({ leagueId: league.id, code });
            }}
          >
            {t("joinButtonLabel")}
          </Button>
        </div>
      </div>
    </div>
  );
}
