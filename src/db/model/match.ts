import { League, matches, Team, teams, User } from "@/db/schema";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/session";
import { ratingSystems } from "@/lib/rating";

export async function createMatch(
  league: League,
  user: User,
  team1: Team,
  team2: Team,
  score1: number,
  score2: number,
) {
  const ratingSystem = ratingSystems.find(rs => rs.id === league.ratingSystem);
  if (!ratingSystem) {
    return;
  }

  const team1Rating = team1.rating;
  const team2Rating = team2.rating;
  const team1NewRating = ratingSystem.getNewRating(
    league,
    team1,
    team2,
    score1,
    score2,
  );
  const team2NewRating = ratingSystem.getNewRating(
    league,
    team2,
    team1,
    score2,
    score1,
  );

  await db
    .update(teams)
    .set({
      rating: team1NewRating,
    })
    .where(eq(teams.id, team1.id));

  await db
    .update(teams)
    .set({
      rating: team2Rating,
    })
    .where(eq(teams.id, team2.id));

  return db.insert(matches).values({
    leagueId: league.id,
    team1Id: team1.id,
    team2Id: team2.id,
    score1,
    score2,
    userId: user.id,
    team1RatingChange: team1NewRating - team1Rating,
    team2RatingChange: team2NewRating - team2Rating,
    team1Rating: team1NewRating,
    team2Rating: team2NewRating,
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
