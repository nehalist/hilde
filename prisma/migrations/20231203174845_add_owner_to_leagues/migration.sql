/*
  Warnings:

  - Added the required column `ownerId` to the `league` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `league` ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `league` ADD CONSTRAINT `league_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
