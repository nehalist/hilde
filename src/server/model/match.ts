import { prisma } from "~/server/prisma";
import { getTeamSize } from "~/model/team";
import { Team } from "@prisma/client";
import { addMatchToTeam, setAchievements } from "~/server/model/team";

export async function createMatch(
  team1: Team,
  team2: Team,
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
    },
  });

  await setAchievements(updatedTeam1.team, updatedTeam2.team, match);

  return match;
}
