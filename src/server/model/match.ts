import { prisma } from "~/server/prisma";
import { getTeamSize } from "~/model";
import { Prisma } from "@prisma/client";
import {
  addMatchToTeam,
  setMatchAchievements,
  TeamWithMetaAndAchievements,
} from "~/server/model/team";
import { getCurrentSeason } from "~/utils/season";

export const matchWithAchievements = Prisma.validator<Prisma.MatchArgs>()({
  include: {
    achievements: true,
  },
});

export type MatchWithAchievements = Prisma.MatchGetPayload<
  typeof matchWithAchievements
>;

export async function createMatch(
  team1: TeamWithMetaAndAchievements,
  team2: TeamWithMetaAndAchievements,
  score1: number,
  score2: number,
  comment: string,
) {
  const updatedTeam1 = await addMatchToTeam(
    team1,
    team2,
    score1 > score2,
    score1,
    new Date(),
  );
  const updatedTeam2 = await addMatchToTeam(
    team2,
    team1,
    score2 > score1,
    score2,
    new Date(),
  );

  const match = await prisma.match.create({
    data: {
      team1: team1.name,
      team2: team2.name,
      score1: +score1,
      score2: +score2,
      comment,
      game: "default",
      team1Rating: updatedTeam1.rating,
      team2Rating: updatedTeam2.rating,
      team1RatingChange: updatedTeam2.diff,
      team2RatingChange: updatedTeam1.diff,
      teamsize: getTeamSize(team1.name),
      season: getCurrentSeason(),
    },
  });

  await setMatchAchievements(updatedTeam1.team, updatedTeam2.team, match);

  return match;
}
