/*
  Warnings:

  - You are about to drop the column `meta` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `meta` on the `match` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "team_meta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "season" INTEGER NOT NULL DEFAULT 1,
    "teamId" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "achievementPoints" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "team_achievement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" INTEGER NOT NULL,
    "achievement" TEXT NOT NULL,
    "season" INTEGER NOT NULL DEFAULT 1,
    "matchId" INTEGER NOT NULL,
    CONSTRAINT "team_achievement_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_achievement_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "teamsize" INTEGER NOT NULL
);
INSERT INTO "new_team" ("createdAt", "id", "name", "teamsize") SELECT "createdAt", "id", "name", "teamsize" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE UNIQUE INDEX "team_name_key" ON "team"("name");
CREATE TABLE "new_match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team1" TEXT NOT NULL,
    "team2" TEXT NOT NULL,
    "score1" INTEGER NOT NULL,
    "score2" INTEGER NOT NULL,
    "team1RatingChange" REAL NOT NULL DEFAULT 0,
    "team2RatingChange" REAL NOT NULL DEFAULT 0,
    "team1Rating" REAL NOT NULL DEFAULT 0,
    "team2Rating" REAL NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "teamsize" INTEGER NOT NULL,
    "season" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_match" ("comment", "createdAt", "game", "id", "score1", "score2", "season", "team1", "team1Rating", "team1RatingChange", "team2", "team2Rating", "team2RatingChange", "teamsize") SELECT "comment", "createdAt", "game", "id", "score1", "score2", "season", "team1", "team1Rating", "team1RatingChange", "team2", "team2Rating", "team2RatingChange", "teamsize" FROM "match";
DROP TABLE "match";
ALTER TABLE "new_match" RENAME TO "match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
