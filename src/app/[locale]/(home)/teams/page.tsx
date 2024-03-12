import { getLeagueTeams, getSelectedUserLeague } from "@/db/model/league";
import { TeamsTable } from "@/app/[locale]/(home)/teams-table";

export default async function Teams() {
  const currentLeague = await getSelectedUserLeague();

  if (! currentLeague) {
    return null;
  }

  const teams = await getLeagueTeams(currentLeague.id);

  return (
    <TeamsTable teams={teams} />
  );
}
