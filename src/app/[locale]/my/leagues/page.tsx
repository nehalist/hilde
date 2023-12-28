import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { getLeaguesForUser } from "@/db/model/league";
import { LeagueTable } from "@/app/[locale]/my/leagues/league-table";
import { LeagueHeader } from "@/app/[locale]/my/leagues/league-header";
import { getTranslations } from "next-intl/server";
import { RefreshOnFocus } from "@/components/refresh-on-focus";

async function getLeagues() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  return getLeaguesForUser(user);
}

export default async function Leagues() {
  const leagues = await getLeagues();
  const t = await getTranslations("LeagueManagement");
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <LeagueHeader
        canCreateLeagues={
          user.maxLeagues >=
          leagues.filter(l => l.league.status === "active").length
        }
        messages={{
          description: t("description"),
          createButtonLabel: t("createButtonLabel"),
        }}
      />
      <LeagueTable leagues={leagues} />
      <RefreshOnFocus />
    </div>
  );
}
