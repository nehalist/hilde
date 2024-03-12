import { LeagueHeaderActions } from "@/app/[locale]/my/leagues/league-header-actions";
import { LeagueTable } from "@/app/[locale]/my/leagues/league-table";
import { MyHeader } from "@/app/[locale]/my/my-header";
import { RefreshOnFocus } from "@/components/refresh-on-focus";
import { getUserLeagues } from "@/db/model/league";
import { getCurrentUser } from "@/lib/session";
import { getTranslations } from "next-intl/server";

export default async function Leagues() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const t = await getTranslations("my");
  const leagues = await getUserLeagues(user);

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
