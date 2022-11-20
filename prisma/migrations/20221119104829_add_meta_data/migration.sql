/*
  Warnings:

  - You are about to drop the column `game` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `matches` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `wins` on the `team` table. All the data in the column will be lost.

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
    "teamsize" INTEGER NOT NULL,
    "meta" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_match" ("comment", "createdAt", "game", "id", "rating1", "rating2", "score1", "score2", "team1", "team2", "teamsize") SELECT "comment", "createdAt", "game", "id", "rating1", "rating2", "score1", "score2", "team1", "team2", "teamsize" FROM "match";
DROP TABLE "match";
ALTER TABLE "new_match" RENAME TO "match";
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "teamsize" INTEGER NOT NULL,
    "meta" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_team" ("createdAt", "id", "name", "rating", "teamsize") SELECT "createdAt", "id", "name", "rating", "teamsize" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
