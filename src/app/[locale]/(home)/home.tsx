import { MatchCreator } from "@/app/[locale]/(home)/match-creator";
import { RecentMatches } from "@/app/[locale]/(home)/recent-matches";
import { RefreshOnFocus } from "@/components/refresh-on-focus";
import { getLeagueTeams, getSelectedUserLeague } from "@/db/model/league";
import { getRecentLeagueMatches } from "@/db/model/match";
import { User } from "@/db/schema";

interface HomeProps {
  user: User;
}

export async function Home({ user }: HomeProps) {
  const league = await getSelectedUserLeague();
  const recentMatches = await getRecentLeagueMatches();

  if (!league) {
    return null;
  }

  const teams = await getLeagueTeams(league.id);

  return (
    <>
      <RefreshOnFocus />
      <MatchCreator teams={teams} user={user} />
      <RecentMatches matches={recentMatches} />
    </>
  );
}
