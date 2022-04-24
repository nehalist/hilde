import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import nc from "next-connect";

const handler = nc().delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const match = await prisma.match.delete({
    where: {
      id: +id,
    },
  });

  res.json(match);
});

export default handler;
