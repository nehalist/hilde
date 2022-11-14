import { prisma } from "~/server/prisma";
import config from "../../../config.json";
import { Team } from "@prisma/client";
import { getTeamSize } from "~/utils/helper";

export async function getOrCreateTeam(name: string) {
  return await prisma.team.upsert({
    where: {
      name_game: {
        name,
        game: config.defaultGame,
      },
    },
    update: {},
    create: {
      name: name,
      createdAt: new Date(),
      rating: 1000,
      teamsize: getTeamSize(name),
      matches: 0,
      wins: 0,
      goals: 0,
      game: config.defaultGame,
    },
  });
}

export async function updateTeam(
  team: Team,
  rating: number,
  win: boolean,
  score: number,
) {
  return await prisma.team.update({
    where: {
      id: team.id,
    },
    data: {
      rating: +Number(rating).toFixed(2),
      matches: team.matches + 1,
      wins: win ? team.wins + 1 : team.wins,
      goals: team.goals + score,
    },
  });
}
