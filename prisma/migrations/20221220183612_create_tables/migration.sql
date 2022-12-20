-- CreateTable
CREATE TABLE `match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `teamsize` INTEGER NOT NULL,

    UNIQUE INDEX `team_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teamId` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `season` INTEGER NOT NULL DEFAULT 1,
    `teamId` INTEGER NOT NULL,
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

    INDEX `teamId_teamId_idx`(`teamId`),
    UNIQUE INDEX `teamId_season_teamId_key`(`season`, `teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teamName` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,
    `achievement` VARCHAR(191) NOT NULL,
    `season` INTEGER NOT NULL DEFAULT 1,
    `matchId` INTEGER NOT NULL,

    INDEX `team_achievement_matchId_teamId_idx`(`matchId`, `teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
