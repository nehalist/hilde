import { prisma } from "~/server/prisma";
import config from "../../../config.json";
import { getTeamSize } from "~/utils/helper";

export async function createMatch(
  team1: string,
  team2: string,
  score1: number,
  score2: number,
  comment: string,
  ratingDiff1: number,
  ratingDiff2: number,
) {
  return await prisma.match.create({
    data: {
      team1: team1,
      team2: team2,
      score1: +score1,
      score2: +score2,
      comment,
      game: config.defaultGame,
      rating1: +Number(ratingDiff2).toFixed(2),
      rating2: +Number(ratingDiff1).toFixed(2),
      teamsize: getTeamSize(team1),
    },
  });
}
