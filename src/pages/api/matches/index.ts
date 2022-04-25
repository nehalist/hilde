import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import nc from "next-connect";
import { getExpectedRating, calculateRating } from "../../../lib/elo";
import { Team } from "@prisma/client";
import { getTeamSize } from "../../../lib/helper";
import config from "../../../../config.json";

async function getTeam(name: string): Promise<Team> {
  name = name.trim();
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

async function updateTeam(name: string, rating: number, win: boolean, goals: number): Promise<Team> {
  const team = await getTeam(name);
  return await prisma.team.update(
    {
      where: {
        id: team.id,
      },
      data: {
        rating: +Number(rating).toFixed(2),
        matches: team.matches + 1,
        wins: win ? team.wins + 1 : team.wins,
        goals: team.goals + goals,
      },
    },
  );
}

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
    if (!team1 || !team2 || +score1 < 0 || +score2 < 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "team1, team2, score1, score2 are required",
      });
      return;
    }

    const team1Obj = await getTeam(team1);
    const team2Obj = await getTeam(team2);

    const teamRating1 = team1Obj.rating;
    const teamRating2 = team2Obj.rating;

    const expected1 = getExpectedRating(teamRating1, teamRating2);
    const expected2 = getExpectedRating(teamRating2, teamRating1);

    const rating1 = calculateRating(
      expected1,
      score1 > score2 ? 1 : 0,
      teamRating1,
    );
    const ratingDiff1 = teamRating1 - rating1;
    const rating2 = calculateRating(
      expected2,
      score1 < score2 ? 1 : 0,
      teamRating2,
    );
    const ratingDiff2 = teamRating2 - rating2;

    await updateTeam(team1, rating1, score1 > score2, score1);
    await updateTeam(team2, rating2, score1 < score2, score2);

    const match = await prisma.match.create({
      data: {
        team1: team1.split(",").sort().join(","),
        team2: team2.split(",").sort().join(","),
        score1: +score1,
        score2: +score2,
        comment,
        game: config.defaultGame,
        rating1: +Number(ratingDiff2).toFixed(2),
        rating2: +Number(ratingDiff1).toFixed(2),
        teamsize: getTeamSize(team1),
      },
    });

    res.status(200).json(match);
  });

export default handler;
