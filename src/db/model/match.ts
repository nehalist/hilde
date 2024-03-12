import { db } from "@/db";
import { addMatchToTeam } from "@/db/model/team";
import {
  achievements,
  League,
  Match,
  matches,
  Team,
  teams,
  User,
} from "@/db/schema";
import { achievementList } from "@/lib/achievements";
import { getCurrentUser } from "@/lib/session";
import { desc } from "drizzle-orm";

export enum MatchResult {
  Win = "win",
  Loss = "loss",
  Draw = "draw",
}

export function getMatchResult(team: Team, match: Match): MatchResult {
  if (match.score1 === match.score2) {
    return MatchResult.Draw;
  }
  if (match.team1Id === team.id && match.score1 < match.score2) {
    return MatchResult.Loss;
  }
  if (match.team2Id === team.id && match.score2 < match.score1) {
    return MatchResult.Loss;
  }
  return MatchResult.Win;
}

export async function createMatch(
  league: League,
  user: User,
  team1: Team,
  team2: Team,
  score1: number,
  score2: number,
  comment?: string,
) {
  // update teams
  const updatedTeam1 = await addMatchToTeam(
    league,
    team1,
    score1,
    team2,
    score2,
    new Date(),
  );
  const updatedTeam2 = await addMatchToTeam(
    league,
    team2,
    score2,
    team1,
    score1,
    new Date(),
  );

  // create match
  const [match] = await db
    .insert(matches)
    .values({
      leagueId: league.id,
      team1Id: team1.id,
      team2Id: team2.id,
      score1,
      score2,
      userId: user.id,
      team1RatingChange: updatedTeam1.rating - team1.rating,
      team2RatingChange: updatedTeam2.rating - team2.rating,
      team1Rating: updatedTeam1.rating,
      team2Rating: updatedTeam2.rating,
      comment,
    })
    .returning();

  // check/grant achievements
  await checkMatchAchievements(updatedTeam1, updatedTeam2, match, league);
  await checkMatchAchievements(updatedTeam2, updatedTeam1, match, league);

  return match;
}

async function checkMatchAchievements(
  team: Team,
  opponent: Team,
  match: Match,
  league: League,
) {
  const teamAchievements = await db.query.achievements.findMany({
    where: (achievement, { eq }) => eq(achievement.teamId, team.id),
  });
  const grantableAchievements = achievementList.filter(achievement => {
    if (teamAchievements.find(a => a.achievement === achievement.id)) {
      return false;
    }
    return achievement.condition(team, opponent, match, league);
  });

  for await (const achievement of grantableAchievements) {
    await db.insert(achievements).values({
      teamId: team.id,
      matchId: match.id,
      achievement: achievement.id,
    });

    await db.update(teams).set({
      achievementPoints: team.achievementPoints + achievement.points,
    });
  }
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
      achievements: true,
    },
    orderBy: desc(matches.createdAt),
    limit: 5,
  });
}
