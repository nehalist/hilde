import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import nc from "next-connect";

const handler = nc().delete(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const team = await prisma.team.delete({
      where: {
        id: +id,
      },
    });
    await prisma.match.deleteMany({
      where: {
        OR: [
          {
            team1: team.name,
          },
          {
            team2: team.name,
          },
        ],
      },
    });

    res.json(team);
  },
);

export default handler;
