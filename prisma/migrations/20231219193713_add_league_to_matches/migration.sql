/*
  Warnings:

  - You are about to drop the column `season` on the `match` table. All the data in the column will be lost.
  - Added the required column `leagueId` to the `match` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `match_season_idx` ON `match`;

-- AlterTable
ALTER TABLE `match` DROP COLUMN `season`,
    ADD COLUMN `leagueId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `match` ADD CONSTRAINT `match_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `league`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
