import { prisma } from "~/server/prisma";
import { Match, Prisma, Team } from "@prisma/client";
import { getCurrentSeasonMeta, getTeamSize } from "~/model/team";
import { Achievement } from "~/utils/achievements";
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
  const team = await prisma.team.upsert({
    where: {
      name,
    },
    include: {
      meta: true,
    },
    update: {},
    create: {
      name: name,
      createdAt: new Date(),
      teamsize: getTeamSize(name),
      meta: {
        create: {
          season: getCurrentSeason(),
          rating: defaultRating,
        },
      },
    },
  });

  if (team.meta.length === 0) {
    const meta = await prisma.teamMeta.create({
      data: {
        teamId: team.id,
        season: getCurrentSeason(),
        rating: defaultRating,
      },
    });
    team.meta.push(meta);
  }

  return team;
}

export async function addMatchToTeam(
  team: TeamWithMeta,
  opponent: TeamWithMeta,
  win: boolean,
  score: number,
  date: Date,
  season = getCurrentSeason(),
) {
  const teamSeasonMeta = getCurrentSeasonMeta(team);
  const opponentSeasonMeta = getCurrentSeasonMeta(opponent);
  if (!teamSeasonMeta || !opponentSeasonMeta) {
    throw new Error(
      `Team ${team.name} or ${opponent.name} has no meta data for season ${season}`,
    );
  }
  const newDaily =
    !teamSeasonMeta.updatedAt ||
    format(date, "yyyy-MM-dd") >
      format(new Date(teamSeasonMeta.updatedAt), "yyyy-MM-dd");

  const currentRating = teamSeasonMeta.rating;
  const opponentRating = opponentSeasonMeta.rating;

  const expectedRating = getExpectedRating(currentRating, opponentRating);
  const rating = calculateRating(expectedRating, win ? 1 : 0, currentRating);

  return {
    team: await prisma.teamMeta.update({
      data: {
        updatedAt: date,
        rating,
        totalMatches: teamSeasonMeta.totalMatches,
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
          (teamSeasonMeta.totalScore + score) /
          (teamSeasonMeta.totalMatches + 1),
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
      },
      where: {
        id: teamSeasonMeta.id,
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
  // if (achievements.length === 0) {
  //   return {
  //     team,
  //     match,
  //   };
  // }
  //
  // const teamMeta = getTeamMeta(team);
  // const teamSeasonMeta = getCurrentSeasonMeta(team);
  // const matchMeta = getMatchMeta(match);
  // const matchTeam = match.team1 === team.name ? "team1" : "team2";
  //
  // const updatedMatch = await prisma.match.update({
  //   where: {
  //     id: match.id,
  //   },
  //   data: {
  //     meta: JSON.stringify({
  //       ...matchMeta,
  //       achievements: {
  //         ...matchMeta.achievements,
  //         [matchTeam]: achievements.map(a => a.id),
  //       },
  //     }),
  //   },
  // });
  //
  // return {
  //   team: await prisma.team.update({
  //     where: {
  //       id: team.id,
  //     },
  //     data: {
  //       meta: JSON.stringify({
  //         ...teamMeta,
  //         [getCurrentSeason()]: {
  //           ...teamSeasonMeta,
  //           achievementPoints:
  //             teamSeasonMeta.achievementPoints +
  //             achievements.reduce((a, b) => a + b.points, 0),
  //           achievements: [
  //             ...teamSeasonMeta.achievements,
  //             ...achievements.map(a => ({
  //               id: a.id,
  //               earnedAt: match.createdAt,
  //               matchId: match.id,
  //             })),
  //           ],
  //         },
  //       }),
  //     },
  //   }),
  //   match: updatedMatch,
  // };
}

export async function setAchievements(team1: Team, team2: Team, match: Match) {
  // const achievements1 = checkAchievements(team1, team2, match);
  // const achievements2 = checkAchievements(team2, team1, match);
  // const { match: updatedMatch } = await grantAchievements(
  //   team1,
  //   achievements1,
  //   match,
  // );
  // await grantAchievements(team2, achievements2, updatedMatch);
  return {
    achievements1: [],
    achievements2: [],
  };
}
