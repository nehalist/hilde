/*
  Warnings:

  - You are about to drop the column `achievementPoints` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `team` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "meta" TEXT NOT NULL DEFAULT '{}',
    "season" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_match" ("comment", "createdAt", "game", "id", "meta", "score1", "score2", "team1", "team1Rating", "team1RatingChange", "team2", "team2Rating", "team2RatingChange", "teamsize") SELECT "comment", "createdAt", "game", "id", "meta", "score1", "score2", "team1", "team1Rating", "team1RatingChange", "team2", "team2Rating", "team2RatingChange", "teamsize" FROM "match";
DROP TABLE "match";
ALTER TABLE "new_match" RENAME TO "match";
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "teamsize" INTEGER NOT NULL,
    "meta" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_team" ("createdAt", "id", "meta", "name", "teamsize") SELECT "createdAt", "id", "meta", "name", "teamsize" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE UNIQUE INDEX "team_name_key" ON "team"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
