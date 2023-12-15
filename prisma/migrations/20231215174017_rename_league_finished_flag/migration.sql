/*
  Warnings:

  - You are about to drop the column `closed` on the `league` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `league` DROP COLUMN `closed`,
    ADD COLUMN `finished` BOOLEAN NOT NULL DEFAULT false;
