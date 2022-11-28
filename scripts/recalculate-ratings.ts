require("dotenv").config();
import { defaultRating } from "~/utils/elo";
import { prisma } from "~/server/prisma";
import {
  addMatchToTeam,
  getOrCreateTeam,
  setAchievements,
} from "~/server/model/team";

(async () => {
  console.log(`Recalculating, defaultRating=${defaultRating}`);

  const matches = await prisma.match.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  console.log(`Found ${matches.length} matches`);

  await prisma.team.updateMany({
    data: {
      meta: JSON.stringify({}),
      rating: defaultRating,
      achievementPoints: 0,
    },
  });
  await prisma.match.updateMany({
    data: {
      meta: JSON.stringify({}),
    },
  });

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
    );
    const updatedTeam2 = await addMatchToTeam(
      team2,
      team1,
      match.score2 > match.score1,
      match.score2,
      match.createdAt,
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

    await setAchievements(updatedTeam1.team, updatedTeam2.team, match);

    i++;
    if (i % 100 === 0) {
      console.log(`Processed ${i} matches`);
    }
  }

  console.log("Done.");
})();
