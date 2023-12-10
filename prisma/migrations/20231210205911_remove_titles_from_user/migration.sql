/*
  Warnings:

  - You are about to drop the column `prefix` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `suffix` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `prefix`,
    DROP COLUMN `suffix`;
