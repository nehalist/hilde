-- AlterTable
ALTER TABLE `user` ADD COLUMN `selectedLeagueId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_selectedLeagueId_fkey` FOREIGN KEY (`selectedLeagueId`) REFERENCES `league`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
