import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import nc from "next-connect";

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const matches = await prisma.match.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      take: 5,
    });
    res.json(matches);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { team1, team2, score1, score2, comment } = req.body;
    if (!team1 || !team2 || !score1 || !score2) {
      res.status(400).json({
        error: "Bad Request",
        message: "team1, team2, score1, score2 are required",
      });
      return;
    }
    const match = await prisma.match.create({
      data: {
        team1: team1.split(",").sort().join(","),
        team2: team2.split(",").sort().join(","),
        score1: +score1,
        score2: +score2,
        comment,
        game: 'wuzzeln'
      },
    });
    res.status(200).json(match);
  });

export default handler;
