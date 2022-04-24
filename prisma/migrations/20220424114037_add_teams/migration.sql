/*
  Warnings:

  - Added the required column `rating1` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating2` to the `match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "game" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team1" TEXT NOT NULL,
    "team2" TEXT NOT NULL,
    "score1" INTEGER NOT NULL,
    "score2" INTEGER NOT NULL,
    "rating1" INTEGER NOT NULL,
    "rating2" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "game" TEXT NOT NULL
);
INSERT INTO "new_match" ("comment", "createdAt", "game", "id", "score1", "score2", "team1", "team2") SELECT "comment", "createdAt", "game", "id", "score1", "score2", "team1", "team2" FROM "match";
DROP TABLE "match";
ALTER TABLE "new_match" RENAME TO "match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
