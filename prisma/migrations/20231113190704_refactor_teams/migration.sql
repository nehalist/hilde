-- AlterTable
ALTER TABLE `team` ADD COLUMN `closeReason` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `selectedTeamId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_selectedTeamId_fkey` FOREIGN KEY (`selectedTeamId`) REFERENCES `team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
