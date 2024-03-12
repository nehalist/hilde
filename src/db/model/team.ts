import { db } from "@/db";
import { League, Team, teams } from "@/db/schema";
import { ratingSystems } from "@/lib/rating";
import { format } from "date-fns";
import { and, eq } from "drizzle-orm";

export function getTeamSize(teamName: string) {
  return teamName.split(",").length;
}

export async function getTeamById(id: string) {
  return db.query.teams.findFirst({ where: eq(teams.id, id) });
}

export async function getOrCreateTeam(
  league: League,
  name: string,
  userId: string,
): Promise<Team> {
  const existingTeam = await db.query.teams.findFirst({
    where: (team, { eq }) =>
      and(eq(team.name, name), eq(team.leagueId, league.id)),
  });
  if (existingTeam) {
    return existingTeam;
  }

  const [team] = await db
    .insert(teams)
    .values({
      name,
      leagueId: league.id,
      userId,
      teamSize: getTeamSize(name),
      rating: league.defaultRating,
      totalHighestRating: league.defaultRating,
      totalLowestRating: league.defaultRating,
    })
    .onConflictDoNothing()
    .returning();

  return team;
}

export async function addMatchToTeam(
  league: League,
  team: Team,
  score1: number,
  opponent: Team,
  score2: number,
  date: Date,
) {
  const ratingSystem = ratingSystems.find(rs => rs.id === league.ratingSystem);
  if (!ratingSystem) {
    throw new Error(
      `Rating system ${league.ratingSystem} not found for league ${league.id}`,
    );
  }

  const newDaily =
    !team.updatedAt ||
    format(date, "yyyy-MM-dd") > format(new Date(team.updatedAt), "yyyy-MM-dd");

  const rating = ratingSystem.getNewRating(
    league,
    team,
    opponent,
    score1,
    score2,
  );
  const win = score1 > score2;

  const [updatedTeam] = await db
    .update(teams)
    .set({
      rating,
      totalMatches: team.totalMatches + 1,
      totalWins: team.totalWins + (win ? 1 : 0),
      totalWinRate: (team.totalWins + (win ? 1 : 0)) / (team.totalMatches + 1),
      totalHighestWinStreak: win
        ? Math.max(team.totalHighestWinStreak, team.currentWinStreak + 1)
        : team.totalHighestWinStreak,
      totalLosses: team.totalLosses + (win ? 0 : 1),
      totalHighestLosingStreak: !win
        ? Math.max(team.totalHighestLosingStreak, team.currentLosingStreak + 1)
        : team.totalHighestLosingStreak,
      totalScore: team.totalScore + score1,
      totalAvgScore: (team.totalScore + score1) / (team.totalMatches + 1),
      totalHighestRating: Math.max(team.totalHighestRating, rating),
      totalLowestRating: Math.min(team.totalLowestRating, rating),
      ...(newDaily
        ? {
            dailyMatches: 1,
            dailyWins: win ? 1 : 0,
            dailyWinRate: win ? 1 : 0,
            dailyLosses: win ? 0 : 1,
            dailyScore: score1,
            dailyAvgScore: score1,
          }
        : {
            dailyMatches: team.dailyMatches + 1,
            dailyWins: team.dailyWins + (win ? 1 : 0),
            dailyWinRate:
              (team.dailyWins + (win ? 1 : 0)) / (team.dailyMatches + 1),
            dailyLosses: team.dailyLosses + (win ? 0 : 1),
            dailyScore: team.dailyScore + score1,
            dailyAvgScore: (team.dailyScore + score1) / (team.dailyMatches + 1),
          }),
      currentWinStreak: win ? team.currentWinStreak + 1 : 0,
      currentLosingStreak: !win ? team.currentLosingStreak + 1 : 0,
    })
    .where(eq(teams.id, team.id))
    .returning();

  return updatedTeam;
}
