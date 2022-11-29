import { prisma } from "~/server/prisma";
import { Match, Team } from "@prisma/client";
import { calculateRating, getExpectedRating } from "~/utils/elo";
import { format } from "date-fns";
import {
  getCurrentSeasonMeta,
  getSeasonMeta,
  getTeamMeta,
  getTeamSize,
  TeamMeta,
} from "~/model/team";
import { Achievement, checkAchievements } from "~/utils/achievements";
import { getMatchMeta } from "~/model/match";
import { getCurrentSeason } from "~/utils/season";

export async function getOrCreateTeam(name: string) {
  return await prisma.team.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name: name,
      createdAt: new Date(),
      teamsize: getTeamSize(name),
    },
  });
}

export async function addMatchToTeam(
  team: Team,
  opponent: Team,
  win: boolean,
  score: number,
  date: Date,
  season = getCurrentSeason(),
) {
  const meta = getTeamMeta(team);
  const seasonMeta = getSeasonMeta(team, season);
  const opponentSeasonMeta = getSeasonMeta(opponent, season);
  const newDaily =
    !seasonMeta.daily.date ||
    format(date, "yyyy-MM-dd") >
      format(new Date(seasonMeta.daily.date), "yyyy-MM-dd");

  const currentRating = seasonMeta.rating;
  const opponentRating = opponentSeasonMeta.rating;

  const expectedRating = getExpectedRating(currentRating, opponentRating);
  const rating = calculateRating(expectedRating, win ? 1 : 0, currentRating);

  const newSeasonMeta: TeamMeta = {
    rating,
    achievementPoints: seasonMeta.achievementPoints,
    achievements: seasonMeta.achievements,
    total: {
      ...seasonMeta.total,
      matches: seasonMeta.total.matches + 1,
      wins: seasonMeta.total.wins + (win ? 1 : 0),
      winRate:
        (seasonMeta.total.wins + (win ? 1 : 0)) /
        (seasonMeta.total.matches + 1),
      highestWinStreak: win
        ? Math.max(
            seasonMeta.total.highestWinStreak,
            seasonMeta.current.winStreak + 1,
          )
        : seasonMeta.total.highestWinStreak,
      losses: seasonMeta.total.losses + (win ? 0 : 1),
      highestLosingStreak: !win
        ? Math.max(
            seasonMeta.total.highestLosingStreak,
            seasonMeta.current.losingStreak + 1,
          )
        : seasonMeta.total.highestLosingStreak,
      score: seasonMeta.total.score + score,
      avgScore:
        (seasonMeta.total.score + score) / (seasonMeta.total.matches + 1),
      highestRating: Math.max(seasonMeta.total.highestRating, rating),
      lowestRating: Math.min(seasonMeta.total.lowestRating, rating),
    },
    daily: newDaily
      ? {
          matches: 1,
          wins: win ? 1 : 0,
          winRate: win ? 1 : 0,
          losses: win ? 0 : 1,
          score: score,
          avgScore: score,
          date,
        }
      : {
          matches: seasonMeta.daily.matches + 1,
          wins: seasonMeta.daily.wins + (win ? 1 : 0),
          winRate:
            (seasonMeta.daily.wins + (win ? 1 : 0)) /
            (seasonMeta.daily.matches + 1),
          losses: seasonMeta.daily.losses + (win ? 0 : 1),
          score: seasonMeta.daily.score + score,
          avgScore:
            (seasonMeta.daily.score + score) / (seasonMeta.daily.matches + 1),
          date: seasonMeta.daily.date,
        },
    current: {
      winStreak: win ? seasonMeta.current.winStreak + 1 : 0,
      losingStreak: win ? 0 : seasonMeta.current.losingStreak + 1,
    },
  };

  return {
    team: await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        meta: JSON.stringify({
          ...meta,
          [season]: newSeasonMeta,
        }),
      },
    }),
    rating,
    diff: currentRating - rating,
  };
}

export async function grantAchievements(
  team: Team,
  achievements: Achievement[],
  match: Match,
) {
  if (achievements.length === 0) {
    return {
      team,
      match,
    };
  }

  const teamMeta = getTeamMeta(team);
  const teamSeasonMeta = getCurrentSeasonMeta(team);
  const matchMeta = getMatchMeta(match);
  const matchTeam = match.team1 === team.name ? "team1" : "team2";

  const updatedMatch = await prisma.match.update({
    where: {
      id: match.id,
    },
    data: {
      meta: JSON.stringify({
        ...matchMeta,
        achievements: {
          ...matchMeta.achievements,
          [matchTeam]: achievements.map(a => a.id),
        },
      }),
    },
  });

  return {
    team: await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        meta: JSON.stringify({
          ...teamMeta,
          [getCurrentSeason()]: {
            ...teamSeasonMeta,
            achievementPoints:
              teamSeasonMeta.achievementPoints +
              achievements.reduce((a, b) => a + b.points, 0),
            achievements: [
              ...teamSeasonMeta.achievements,
              ...achievements.map(a => ({
                id: a.id,
                earnedAt: match.createdAt,
                matchId: match.id,
              })),
            ],
          },
        }),
      },
    }),
    match: updatedMatch,
  };
}

export async function setAchievements(team1: Team, team2: Team, match: Match) {
  const achievements1 = checkAchievements(team1, team2, match);
  const achievements2 = checkAchievements(team2, team1, match);
  const { match: updatedMatch } = await grantAchievements(
    team1,
    achievements1,
    match,
  );
  await grantAchievements(team2, achievements2, updatedMatch);
  return {
    achievements1,
    achievements2,
  };
}
