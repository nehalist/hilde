import { MatchCreationForm } from "@/app/[locale]/(home)/match-creation-form";
import { getLeagueTeamsForCurrentUser } from "@/db/model/league";

export async function Home() {
  const teams = await getLeagueTeamsForCurrentUser();

  return (
    <>
      <MatchCreationForm teams={teams} />
    </>
  );
}
