-- DropForeignKey
ALTER TABLE `league` DROP FOREIGN KEY `league_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `team_leagueId_fkey`;

-- AddForeignKey
ALTER TABLE `league` ADD CONSTRAINT `league_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `league`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
