-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team_meta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "season" INTEGER NOT NULL DEFAULT 1,
    "teamId" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "achievementPoints" INTEGER NOT NULL DEFAULT 0,
    "totalMatches" INTEGER NOT NULL DEFAULT 0,
    "totalWins" INTEGER NOT NULL DEFAULT 0,
    "totalLosses" INTEGER NOT NULL DEFAULT 0,
    "totalWinRate" REAL NOT NULL DEFAULT 0,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "totalAvgScore" REAL NOT NULL DEFAULT 0,
    "totalHighestRating" REAL NOT NULL DEFAULT 0,
    "totalLowestRating" REAL NOT NULL DEFAULT 0,
    "totalHighestWinStreak" INTEGER NOT NULL DEFAULT 0,
    "totalHighestLosingStreak" INTEGER NOT NULL DEFAULT 0,
    "dailyMatches" INTEGER NOT NULL DEFAULT 0,
    "dailyWins" INTEGER NOT NULL DEFAULT 0,
    "dailyLosses" INTEGER NOT NULL DEFAULT 0,
    "dailyWinRate" REAL NOT NULL DEFAULT 0,
    "dailyScore" INTEGER NOT NULL DEFAULT 0,
    "dailyAvgScore" REAL NOT NULL DEFAULT 0,
    "currentWinStreak" INTEGER NOT NULL DEFAULT 0,
    "currentLosingStreak" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "team_meta_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_team_meta" ("achievementPoints", "createdAt", "currentLosingStreak", "currentWinStreak", "dailyAvgScore", "dailyLosses", "dailyMatches", "dailyScore", "dailyWinRate", "dailyWins", "id", "rating", "season", "teamId", "totalAvgScore", "totalHighestLosingStreak", "totalHighestRating", "totalHighestWinStreak", "totalLosses", "totalLowestRating", "totalMatches", "totalScore", "totalWinRate", "totalWins") SELECT "achievementPoints", "createdAt", "currentLosingStreak", "currentWinStreak", "dailyAvgScore", "dailyLosses", "dailyMatches", "dailyScore", "dailyWinRate", "dailyWins", "id", "rating", "season", "teamId", "totalAvgScore", "totalHighestLosingStreak", "totalHighestRating", "totalHighestWinStreak", "totalLosses", "totalLowestRating", "totalMatches", "totalScore", "totalWinRate", "totalWins" FROM "team_meta";
DROP TABLE "team_meta";
ALTER TABLE "new_team_meta" RENAME TO "team_meta";
CREATE UNIQUE INDEX "team_meta_season_teamId_key" ON "team_meta"("season", "teamId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
