import { MatchCreationForm } from "@/app/[locale]/(home)/match-creation-form";
import { getLeagueTeamsForCurrentUser, getSelectedUserLeague } from "@/db/model/league";
import { RecentMatches } from "@/app/[locale]/(home)/recent-matches";
import { getRecentLeagueMatches } from "@/db/model/match";

export async function Home() {
  const league = await getSelectedUserLeague();
  const teams = await getLeagueTeamsForCurrentUser();
  const recentMatches = await getRecentLeagueMatches();

  if (! league) {
    return null;
  }

  return (
    <>
      <MatchCreationForm teams={teams} />
      <RecentMatches matches={recentMatches} />
    </>
  );
}
