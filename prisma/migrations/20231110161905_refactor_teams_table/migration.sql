/*
  Warnings:

  - You are about to drop the column `teamsize` on the `team` table. All the data in the column will be lost.
  - You are about to drop the `match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team_achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team_meta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdById` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `team_name_key` ON `team`;

-- AlterTable
ALTER TABLE `team` DROP COLUMN `teamsize`,
    ADD COLUMN `closed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdById` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `match`;

-- DropTable
DROP TABLE `season`;

-- DropTable
DROP TABLE `team_achievement`;

-- DropTable
DROP TABLE `team_meta`;

-- CreateTable
CREATE TABLE `_members` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_members_AB_unique`(`A`, `B`),
    INDEX `_members_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_members` ADD CONSTRAINT `_members_A_fkey` FOREIGN KEY (`A`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_members` ADD CONSTRAINT `_members_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
