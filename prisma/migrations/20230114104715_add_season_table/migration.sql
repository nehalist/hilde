-- DropIndex
DROP INDEX `team_meta_teamId_idx` ON `team_meta`;

-- CreateTable
CREATE TABLE `season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `number` INTEGER NOT NULL,
    `current` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `season_number_key`(`number`),
    INDEX `season_number_idx`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `match_season_idx` ON `match`(`season`);

-- CreateIndex
CREATE INDEX `team_meta_teamId_season_idx` ON `team_meta`(`teamId`, `season`);
