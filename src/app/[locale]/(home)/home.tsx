import { MatchCreationForm } from "@/components/match-creation-form";
import { getCurrentUser, getUserLeagues } from "@/lib/session";
import { LeagueHeader } from "@/app/[locale]/(home)/league-header";
import { Container } from "@/components/container";
import { LeagueFeed } from "@/app/[locale]/(home)/league-feed";

export async function Home() {
  const leagues = await getUserLeagues();
  const user = await getCurrentUser();

  if (!leagues || !user) {
    return null; // TODO
  }

  return (
    <Container>
      <div className="grid grid-cols-4 mt-5">
        <div className="col-span-3">
          <LeagueHeader
            leagues={leagues}
            selectedLeagueId={user.selectedLeagueId}
          />
          <MatchCreationForm />
          <LeagueFeed />
        </div>
      </div>
    </Container>
  );
}
