-- AlterTable
ALTER TABLE `league` ADD COLUMN `closed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;
