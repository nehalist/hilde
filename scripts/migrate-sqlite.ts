require("dotenv").config();
import { getArgument } from "./helper";
import { createMatch } from "~/server/model/match";
import { getOrCreateTeam } from "~/server/model/team";
import { getCurrentSeason } from "~/utils/season";

const sqlite3 = require("sqlite3").verbose();

(async () => {
  const file = getArgument("file");
  const db = new sqlite3.Database(file);
  const sql = "SELECT * FROM match";

  db.all(sql, [], async (err, matches) => {
    console.log(`Importing ${matches.length} matches...`);

    let i = 0;
    for await (const match of matches) {
      const team1 = await getOrCreateTeam(match.team1);
      const team2 = await getOrCreateTeam(match.team2);
      await createMatch(
        team1,
        team2,
        match.score1,
        match.score2,
        match.comment,
        new Date(match.createdAt),
        getCurrentSeason(),
        false,
      );

      i++;
      if (i % 100 === 0) {
        console.log(`Imported ${i} matches`);
      }
    }
  });
})();
