/*
  Warnings:

  - The primary key for the `team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `closeReason` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `closed` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `selectedTeamId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_members` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leagueId` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_members` DROP FOREIGN KEY `_members_A_fkey`;

-- DropForeignKey
ALTER TABLE `_members` DROP FOREIGN KEY `_members_B_fkey`;

-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `team_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_selectedTeamId_fkey`;

-- AlterTable
ALTER TABLE `team` DROP PRIMARY KEY,
    DROP COLUMN `closeReason`,
    DROP COLUMN `closed`,
    DROP COLUMN `createdById`,
    DROP COLUMN `description`,
    DROP COLUMN `image`,
    ADD COLUMN `leagueId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `selectedTeamId`;

-- DropTable
DROP TABLE `_members`;

-- CreateTable
CREATE TABLE `match` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `team1` VARCHAR(191) NOT NULL,
    `team2` VARCHAR(191) NOT NULL,
    `score1` INTEGER NOT NULL,
    `score2` INTEGER NOT NULL,
    `team1RatingChange` DOUBLE NOT NULL DEFAULT 0,
    `team2RatingChange` DOUBLE NOT NULL DEFAULT 0,
    `team1Rating` DOUBLE NOT NULL DEFAULT 0,
    `team2Rating` DOUBLE NOT NULL DEFAULT 0,
    `comment` VARCHAR(191) NOT NULL,
    `game` VARCHAR(191) NOT NULL,
    `teamsize` INTEGER NOT NULL,
    `season` INTEGER NOT NULL DEFAULT 1,

    INDEX `match_season_idx`(`season`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `league` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `league_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_member` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teamId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `team_member_teamId_userId_key`(`teamId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_meta` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teamId` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `achievementPoints` INTEGER NOT NULL DEFAULT 0,
    `totalMatches` INTEGER NOT NULL DEFAULT 0,
    `totalWins` INTEGER NOT NULL DEFAULT 0,
    `totalLosses` INTEGER NOT NULL DEFAULT 0,
    `totalWinRate` DOUBLE NOT NULL DEFAULT 0,
    `totalScore` INTEGER NOT NULL DEFAULT 0,
    `totalAvgScore` DOUBLE NOT NULL DEFAULT 0,
    `totalHighestRating` DOUBLE NOT NULL DEFAULT 0,
    `totalLowestRating` DOUBLE NOT NULL DEFAULT 0,
    `totalHighestWinStreak` INTEGER NOT NULL DEFAULT 0,
    `totalHighestLosingStreak` INTEGER NOT NULL DEFAULT 0,
    `dailyMatches` INTEGER NOT NULL DEFAULT 0,
    `dailyWins` INTEGER NOT NULL DEFAULT 0,
    `dailyLosses` INTEGER NOT NULL DEFAULT 0,
    `dailyWinRate` DOUBLE NOT NULL DEFAULT 0,
    `dailyScore` INTEGER NOT NULL DEFAULT 0,
    `dailyAvgScore` DOUBLE NOT NULL DEFAULT 0,
    `currentWinStreak` INTEGER NOT NULL DEFAULT 0,
    `currentLosingStreak` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_achievement` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teamId` VARCHAR(191) NOT NULL,
    `achievement` VARCHAR(191) NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,

    INDEX `team_achievement_matchId_teamId_idx`(`matchId`, `teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `team_name_key` ON `team`(`name`);

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `league`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_member` ADD CONSTRAINT `team_member_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_member` ADD CONSTRAINT `team_member_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_meta` ADD CONSTRAINT `team_meta_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_achievement` ADD CONSTRAINT `team_achievement_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_achievement` ADD CONSTRAINT `team_achievement_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `match`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
