-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team_achievement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamName" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    "achievement" TEXT NOT NULL,
    "season" INTEGER NOT NULL DEFAULT 1,
    "matchId" INTEGER NOT NULL,
    CONSTRAINT "team_achievement_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "team_achievement_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_team_achievement" ("achievement", "createdAt", "id", "matchId", "season", "teamId", "teamName") SELECT "achievement", "createdAt", "id", "matchId", "season", "teamId", "teamName" FROM "team_achievement";
DROP TABLE "team_achievement";
ALTER TABLE "new_team_achievement" RENAME TO "team_achievement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
