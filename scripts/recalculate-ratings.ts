require("dotenv").config();
import { getDefaultTeamMeta, getTeamMeta } from "~/model/team";
import { getCurrentSeason } from "~/utils/season";
import { defaultRating } from "~/utils/elo";
import { prisma } from "~/server/prisma";
import { addMatchToTeam, getOrCreateTeam } from "~/server/model/team";
import { getArgument } from "./helper";

(async () => {
  const season = +getArgument("season") || getCurrentSeason();
  console.log(
    `Recalculating ratings for season ${season} (defaultRating=${defaultRating})`,
  );

  const matches = await prisma.match.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      season,
    },
  });

  console.log(`Found ${matches.length} matches`);

  const teams = await prisma.team.findMany({});
  for await (const team of teams) {
    const meta = getTeamMeta(team);
    await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        meta: JSON.stringify({
          ...meta,
          [season]: getDefaultTeamMeta(),
        }),
      },
    });
  }

  let i = 0;
  for await (const match of matches) {
    const team1 = await getOrCreateTeam(match.team1);
    const team2 = await getOrCreateTeam(match.team2);

    const updatedTeam1 = await addMatchToTeam(
      team1,
      team2,
      match.score1 > match.score2,
      match.score1,
      match.createdAt,
      season,
    );
    const updatedTeam2 = await addMatchToTeam(
      team2,
      team1,
      match.score2 > match.score1,
      match.score2,
      match.createdAt,
      season,
    );

    await prisma.match.update({
      where: {
        id: match.id,
      },
      data: {
        team1Rating: updatedTeam1.rating,
        team2Rating: updatedTeam2.rating,
        team1RatingChange: updatedTeam2.diff,
        team2RatingChange: updatedTeam1.diff,
      },
    });

    // await setAchievements(updatedTeam1.team, updatedTeam2.team, match);

    i++;
    if (i % 100 === 0) {
      console.log(`Processed ${i} matches`);
    }
  }

  console.log("Done.");
})();
