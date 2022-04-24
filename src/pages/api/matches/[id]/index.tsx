import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import nc from "next-connect";

async function updateTeam(
  name: string,
  goals: number,
  rating: number,
  win: boolean,
) {
  const team = await prisma.team.findFirst({
    where: {
      name: name,
    },
  });
  if (!team) {
    return;
  }
  await prisma.team.update({
    where: {
      id: team.id,
    },
    data: {
      name: name,
      rating: win ? team.rating - rating : team.rating + rating * -1,
      goals: win ? team.goals - goals : team.goals + goals,
      matches: team.matches - 1,
      wins: win ? team.wins - 1 : team.wins,
    },
  });
}

const handler = nc().delete(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const match = await prisma.match.delete({
      where: {
        id: +id,
      },
    });
    await updateTeam(
      match.team1,
      match.score1,
      match.rating1,
      match.score1 > match.score2,
    );
    await updateTeam(
      match.team2,
      match.score2,
      match.rating2,
      match.score1 < match.score2,
    );

    res.json(match);
  },
);

export default handler;
