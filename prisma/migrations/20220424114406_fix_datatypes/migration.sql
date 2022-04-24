/*
  Warnings:

  - You are about to alter the column `rating1` on the `match` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `rating2` on the `match` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `rating` on the `team` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

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
    "game" TEXT NOT NULL
);
INSERT INTO "new_match" ("comment", "createdAt", "game", "id", "rating1", "rating2", "score1", "score2", "team1", "team2") SELECT "comment", "createdAt", "game", "id", "rating1", "rating2", "score1", "score2", "team1", "team2" FROM "match";
DROP TABLE "match";
ALTER TABLE "new_match" RENAME TO "match";
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "game" TEXT NOT NULL
);
INSERT INTO "new_team" ("createdAt", "game", "id", "name", "rating") SELECT "createdAt", "game", "id", "name", "rating" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
