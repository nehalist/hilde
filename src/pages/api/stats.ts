import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../lib/prisma";
import { Statistic } from "../../model";

const handler = nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  let { month, year, teamsize } = req.query;

  const date = new Date();
  if (!month) {
    month = (date.getMonth() + 1).toString();
  }
  if (!year) {
    year = date.getFullYear().toString();
  }
  if (!teamsize) {
    teamsize = "1";
  }

  const matches = await prisma.match.findMany({
    where: {
      createdAt: {
        gte: new Date(`${year}-${+month + 1}-01`),
        lt: new Date(`${year}-${+month + 2}-01`),
      },
      teamsize: +teamsize,
    },
  });

  const stats: Statistic = {
    total: 0,
    teams: [],
  };

  matches.forEach(match => {
    stats.total++;
    const winner = match.score1 > match.score2 ? match.team1 : match.team2;
    const loser = match.score1 > match.score2 ? match.team2 : match.team1;

    const winnerGoals =
      match.score1 > match.score2 ? match.score1 : match.score2;
    const loserGoals =
      match.score1 > match.score2 ? match.score2 : match.score1;

    if (!stats.teams.find(t => t.name === winner)) {
      stats.teams.push({
        name: winner,
        matches: 0,
        wins: 0,
        losses: 0,
        goals: 0,
        avgGoals: 0,
        winrate: 0,
        opponents: [],
      });
    }
    if (!stats.teams.find(t => t.name === loser)) {
      stats.teams.push({
        name: loser,
        matches: 0,
        wins: 0,
        losses: 0,
        goals: 0,
        avgGoals: 0,
        winrate: 0,
        opponents: [],
      });
    }

    const winnerStats = stats.teams.find(t => t.name === winner);
    winnerStats!.matches++;
    winnerStats!.wins++;
    winnerStats!.goals += winnerGoals;

    const loserStats = stats.teams.find(t => t.name === loser);
    loserStats!.matches++;
    loserStats!.losses++;
    loserStats!.goals += loserGoals;
  });

  stats.teams.forEach(team => {
    team.winrate =
      team.wins === 0
        ? 0
        : +parseFloat(`${team.wins / team.matches}`).toFixed(2);
    team.avgGoals =
      team.goals === 0
        ? 0
        : +parseFloat(`${team.goals / team.matches}`).toFixed(2);

    const opponentMatches = matches.filter(
      match => match.team1 === team.name || match.team2 === team.name,
    );
    opponentMatches.forEach(opponentMatch => {
      const opponent =
        opponentMatch.team1 === team.name
          ? opponentMatch.team2
          : opponentMatch.team1;
      if (!team.opponents.find(o => o.name === opponent)) {
        team.opponents.push({
          name: opponent,
          matches: 0,
          wins: 0,
          losses: 0,
          goals: 0,
          avgGoals: 0,
          winrate: 0,
        });
      }
      const opponentStats = team.opponents.find(o => o.name === opponent);
      opponentStats!.matches++;

      const teamGoals =
        opponentMatch.team1 === team.name
          ? opponentMatch.score1
          : opponentMatch.score2;
      const opponentWon =
        teamGoals >
        (opponentMatch.team1 === team.name
          ? opponentMatch.score2
          : opponentMatch.score1);

      opponentStats!.goals += teamGoals;
      opponentStats!.wins += opponentWon ? 1 : 0;
      opponentStats!.losses += opponentWon ? 0 : 1;
    });
  });

  stats.teams.forEach(team => {
    team.opponents.forEach(opponent => {
      opponent.winrate =
        opponent.wins === 0
          ? 0
          : +parseFloat(`${opponent.wins / opponent.matches}`).toFixed(2);
      opponent.avgGoals =
        opponent.goals === 0
          ? 0
          : +parseFloat(`${opponent.goals / opponent.matches}`).toFixed(2);
    });
  });

  res.json(stats);
});

export default handler;
