-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "teamsize" INTEGER NOT NULL,
    "achievementPoints" INTEGER NOT NULL DEFAULT 0,
    "meta" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_team" ("createdAt", "id", "meta", "name", "rating", "teamsize") SELECT "createdAt", "id", "meta", "name", "rating", "teamsize" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE UNIQUE INDEX "team_name_key" ON "team"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
