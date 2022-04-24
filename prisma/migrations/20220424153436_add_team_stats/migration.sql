/*
  Warnings:

  - Added the required column `teamsize` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goals` to the `team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matches` to the `team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamsize` to the `team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wins` to the `team` table without a default value. This is not possible if the table is not empty.

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
    "rating1" REAL NOT NULL,
    "rating2" REAL NOT NULL,
    "comment" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "teamsize" INTEGER NOT NULL
);
INSERT INTO "new_match" ("comment", "createdAt", "game", "id", "rating1", "rating2", "score1", "score2", "team1", "team2") SELECT "comment", "createdAt", "game", "id", "rating1", "rating2", "score1", "score2", "team1", "team2" FROM "match";
DROP TABLE "match";
ALTER TABLE "new_match" RENAME TO "match";
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "game" TEXT NOT NULL,
    "matches" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "teamsize" INTEGER NOT NULL
);
INSERT INTO "new_team" ("createdAt", "game", "id", "name", "rating") SELECT "createdAt", "game", "id", "name", "rating" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE UNIQUE INDEX "team_name_game_key" ON "team"("name", "game");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
