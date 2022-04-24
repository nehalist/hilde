/*
  Warnings:

  - A unique constraint covering the columns `[name,game]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "team_name_game_key" ON "team"("name", "game");
