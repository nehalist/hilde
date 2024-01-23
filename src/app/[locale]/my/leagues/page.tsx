import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserLeagues } from "@/db/model/league";
import { LeagueTable } from "@/app/[locale]/my/leagues/league-table";
import { getTranslations } from "next-intl/server";
import { RefreshOnFocus } from "@/components/refresh-on-focus";
import { MyHeader } from "@/app/[locale]/my/my-header";
import { LeagueHeaderActions } from "@/app/[locale]/my/leagues/league-header-actions";

async function getLeagues() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  return getUserLeagues(user);
}

export default async function Leagues() {
  const leagues = await getLeagues();
  const t = await getTranslations("my");
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <MyHeader
        title={t("leagues.title")}
        description={t("leagues.description")}
        actions={<LeagueHeaderActions />}
      />
      <LeagueTable leagues={leagues} />
      <RefreshOnFocus />
    </div>
  );
}
