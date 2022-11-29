require("dotenv").config();
import { getDefaultTeamMeta, getTeamMeta } from "~/model/team";
import { prisma } from "~/server/prisma";
import { getArgument } from "./helper";

(async () => {
  const season = +getArgument("season");
  console.log(`Resetting meta for season ${season}`);

  const teams = await prisma.team.findMany({});
  for await (const team of teams) {
    const meta = getTeamMeta(team);
    await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        meta: JSON.stringify(
          season !== 0
            ? {
                ...meta,
                [season]: getDefaultTeamMeta(),
              }
            : {},
        ),
      },
    });
  }

  console.log("Done.");
})();
