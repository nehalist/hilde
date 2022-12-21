import { prisma } from "~/server/prisma";
import { Match, Prisma, Team } from "@prisma/client";
import { getDefaultTeamMeta, getSeasonMeta, getTeamSize } from "~/model";
import { Achievement, checkAchievements } from "~/utils/achievements";
import { getCurrentSeason } from "~/utils/season";
import { calculateRating, defaultRating, getExpectedRating } from "~/utils/elo";
import { format } from "date-fns";

export const teamWithMeta = Prisma.validator<Prisma.TeamArgs>()({
  include: {
    meta: true,
  },
});

export type TeamWithMeta = Prisma.TeamGetPayload<typeof teamWithMeta>;

export const teamWithAchievements = Prisma.validator<Prisma.TeamArgs>()({
  include: {
    achievements: true,
  },
});

export type TeamWithAchievements = Prisma.TeamGetPayload<
  typeof teamWithAchievements
>;

export type TeamWithMetaAndAchievements = TeamWithMeta & TeamWithAchievements;

export async function getOrCreateTeam(name: string) {
  return await prisma.team.upsert({
    where: {
      name,
    },
    include: {
      meta: true,
      achievements: true,
    },
    update: {},
    create: {
      name,
      createdAt: new Date(),
      teamsize: getTeamSize(name),
      meta: {
        create: {
          ...getDefaultTeamMeta(),
          season: getCurrentSeason(),
        },
      },
    },
  });
}

export async function addMatchToTeam(
  team: TeamWithMetaAndAchievements,
  opponent: TeamWithMetaAndAchievements,
  currentRating: number,
  opponentRating: number,
  win: boolean,
  score: number,
  date: Date,
  season = getCurrentSeason(),
) {
  const teamSeasonMeta = getSeasonMeta(team, season);
  const newDaily =
    !teamSeasonMeta.updatedAt ||
    format(date, "yyyy-MM-dd") >
      format(new Date(teamSeasonMeta.updatedAt), "yyyy-MM-dd");

  const expectedRating = getExpectedRating(currentRating, opponentRating);
  const rating = calculateRating(expectedRating, win ? 1 : 0, currentRating);

  const meta = {
    updatedAt: date,
    rating,
    totalMatches: teamSeasonMeta.totalMatches + 1,
    totalWins: teamSeasonMeta.totalWins + (win ? 1 : 0),
    totalWinRate:
      (teamSeasonMeta.totalWins + (win ? 1 : 0)) /
      (teamSeasonMeta.totalMatches + 1),
    totalHighestWinStreak: win
      ? Math.max(
          teamSeasonMeta.totalHighestWinStreak,
          teamSeasonMeta.currentWinStreak + 1,
        )
      : teamSeasonMeta.totalHighestWinStreak,
    totalLosses: teamSeasonMeta.totalLosses + (win ? 0 : 1),
    totalHighestLosingStreak: !win
      ? Math.max(
          teamSeasonMeta.totalHighestLosingStreak,
          teamSeasonMeta.currentLosingStreak + 1,
        )
      : teamSeasonMeta.totalHighestLosingStreak,
    totalScore: teamSeasonMeta.totalScore + score,
    totalAvgScore:
      (teamSeasonMeta.totalScore + score) / (teamSeasonMeta.totalMatches + 1),
    totalHighestRating: Math.max(teamSeasonMeta.totalHighestRating, rating),
    totalLowestRating: Math.min(teamSeasonMeta.totalLowestRating, rating),
    ...(newDaily
      ? {
          dailyMatches: 1,
          dailyWins: win ? 1 : 0,
          dailyWinRate: win ? 1 : 0,
          dailyLosses: win ? 0 : 1,
          dailyScore: score,
          dailyAvgScore: score,
        }
      : {
          dailyMatches: teamSeasonMeta.dailyMatches + 1,
          dailyWins: teamSeasonMeta.dailyWins + (win ? 1 : 0),
          dailyWinRate:
            (teamSeasonMeta.dailyWins + (win ? 1 : 0)) /
            (teamSeasonMeta.dailyMatches + 1),
          dailyLosses: teamSeasonMeta.dailyLosses + (win ? 0 : 1),
          dailyScore: teamSeasonMeta.dailyScore + score,
          dailyAvgScore:
            (teamSeasonMeta.dailyScore + score) /
            (teamSeasonMeta.dailyMatches + 1),
        }),
    currentWinStreak: win ? teamSeasonMeta.currentWinStreak + 1 : 0,
    currentLosingStreak: !win ? teamSeasonMeta.currentLosingStreak + 1 : 0,
  };
  const updatedMeta = await prisma.teamMeta.upsert({
    create: {
      ...meta,
      teamId: team.id,
      season,
    },
    update: {
      ...meta,
    },
    where: {
      id: teamSeasonMeta.id,
    },
  });
  if (team.meta.find(m => m.id === updatedMeta.id)) {
    team.meta = team.meta.map(m => (m.id === updatedMeta.id ? updatedMeta : m));
  } else {
    team.meta.push(updatedMeta);
  }

  return {
    team,
    rating,
    diff: currentRating - rating,
  };
}

export async function createTeamMeta(team: Team, season = getCurrentSeason()) {
  const { id, ...defaultMeta } = getDefaultTeamMeta();
  return prisma.teamMeta.upsert({
    where: {
      season_teamId: {
        season,
        teamId: team.id,
      },
    },
    update: {},
    create: {
      ...defaultMeta,
      season,
      rating: defaultRating,
      team: {
        connect: {
          id: team.id,
        },
      },
    },
  });
}

export async function grantAchievements(
  team: TeamWithMeta,
  achievements: Achievement[],
  match: Match,
  season = getCurrentSeason(),
) {
  if (achievements.length === 0) {
    return {
      team,
      match,
    };
  }

  const meta = getSeasonMeta(team, season);

  let points = 0;
  for await (const achievement of achievements) {
    await prisma.teamAchievement.create({
      data: {
        season,
        createdAt: match.createdAt,
        team: {
          connect: {
            id: team.id,
          },
        },
        teamName: team.name,
        achievement: achievement.id,
        match: {
          connect: {
            id: match.id,
          },
        },
      },
    });
    points += achievement.points;
  }

  await prisma.teamMeta.update({
    data: {
      achievementPoints: meta.achievementPoints + points,
    },
    where: {
      id: meta.id,
    },
  });
}

export async function setMatchAchievements(
  team1: TeamWithMetaAndAchievements,
  team2: TeamWithMetaAndAchievements,
  match: Match,
  season = getCurrentSeason(),
) {
  const achievements1 = checkAchievements(team1, team2, match);
  const achievements2 = checkAchievements(team2, team1, match);
  await grantAchievements(team1, achievements1, match, season);
  await grantAchievements(team2, achievements2, match, season);
}
