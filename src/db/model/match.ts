import { League, matches, Team, User } from "@/db/schema";
import { db } from "@/db";
import { desc } from "drizzle-orm";
import { getCurrentUser } from "@/lib/session";

export async function createMatch(
  league: League,
  user: User,
  team1: Team,
  team2: Team,
  score1: number,
  score2: number,
) {
  // const ratingSystem = ratingSystems.find(rs => rs.id === league.ratingSystem);
  // if (!ratingSystem) {
  //   return;
  // }
  //
  // const team1Rating = team1.rating;
  // const team2Rating = team2.rating;

  return db.insert(matches).values({
    leagueId: league.id,
    team1Id: team1.id,
    team2Id: team2.id,
    score1,
    score2,
    userId: user.id,
  });
}

export async function getRecentLeagueMatches() {
  const user = await getCurrentUser();
  if (!user || !user.selectedLeagueId) {
    return [];
  }

  return db.query.matches.findMany({
    where: (match, { eq }) => eq(match.leagueId, user.selectedLeagueId!),
    with: {
      team1: true,
      team2: true,
    },
    orderBy: desc(matches.createdAt),
    limit: 5,
  });
}
