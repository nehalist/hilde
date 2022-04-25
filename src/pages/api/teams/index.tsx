import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import nc from "next-connect";

const handler = nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { teamsize } = req.query;

  const teams = await prisma.team.findMany({
    where: {
      teamsize: teamsize ? +teamsize : 1,
    },
    orderBy: [
      {
        rating: "desc",
      },
    ],
  });
  res.json(teams);
});

export default handler;
