import { prisma } from "~/server/prisma";
import { Team } from "@prisma/client";
import { calculateRating, defaultRating, getExpectedRating } from "~/utils/elo";
import { format } from "date-fns";
import { getTeamMeta, getTeamSize, TeamMeta } from "~/model/team";

export async function getOrCreateTeam(name: string) {
  return await prisma.team.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name: name,
      createdAt: new Date(),
      rating: defaultRating,
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
) {
  const meta = getTeamMeta(team);
  const newDaily =
    !meta.daily.date ||
    format(date, "yyyy-MM-dd") > format(meta.daily.date, "yyyy-MM-dd");

  const currentRating = team.rating;
  const opponentRating = opponent.rating;

  const expectedRating = getExpectedRating(currentRating, opponentRating);
  const rating = calculateRating(expectedRating, win ? 1 : 0, currentRating);

  const newMeta: TeamMeta = {
    ...meta,
    total: {
      ...meta.total,
      matches: meta.total.matches + 1,
      wins: meta.total.wins + (win ? 1 : 0),
      winRate: (meta.total.wins + (win ? 1 : 0)) / (meta.total.matches + 1),
      highestWinStreak: win
        ? Math.max(meta.total.highestWinStreak, meta.current.winStreak + 1)
        : meta.total.highestWinStreak,
      losses: meta.total.losses + (win ? 0 : 1),
      highestLosingStreak: !win
        ? Math.max(
            meta.total.highestLosingStreak,
            meta.current.losingStreak + 1,
          )
        : meta.total.highestWinStreak,
      score: meta.total.score + score,
      avgScore: (meta.total.score + score) / (meta.total.matches + 1),
      highestRating: Math.max(meta.total.highestRating, rating),
      lowestRating: Math.min(meta.total.lowestRating, rating),
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
          matches: meta.daily.matches + 1,
          wins: meta.daily.wins + (win ? 1 : 0),
          winRate: (meta.daily.wins + (win ? 1 : 0)) / (meta.daily.matches + 1),
          losses: meta.daily.losses + (win ? 0 : 1),
          score: meta.daily.score + score,
          avgScore: (meta.daily.score + score) / (meta.daily.matches + 1),
          date: meta.daily.date,
        },
    current: {
      winStreak: win ? meta.current.winStreak + 1 : 0,
      losingStreak: win ? 0 : meta.current.losingStreak + 1,
    },
  };

  return {
    team: await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        rating: +Number(rating).toFixed(2),
        meta: JSON.stringify(newMeta),
      },
    }),
    rating,
    diff: currentRating - rating,
  }
}
