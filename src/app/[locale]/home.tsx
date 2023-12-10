import { MatchCreationForm } from "@/components/match-creation-form";
import { getUserLeagues, getUserSelectedLeague } from "@/lib/session";
import { LeagueHeader } from "@/components/league-header";

export async function Home() {
  const leagues = await getUserLeagues();
  const selectedLeague = await getUserSelectedLeague();

  if (!leagues || !selectedLeague) {
    return null;
  }

  return (
    <>
      <LeagueHeader leagues={leagues} selectedLeague={selectedLeague} />
      <MatchCreationForm />
    </>
  );
}
