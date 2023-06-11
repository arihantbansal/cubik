-- CreateTable
CREATE TABLE `Hackathon` (
    `_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(500) NOT NULL,
    `background` VARCHAR(500) NOT NULL,
    `short_description` VARCHAR(2000) NOT NULL,
    `description` TEXT NOT NULL,
    `host` JSON NULL,
    `prize_pool` INTEGER NOT NULL DEFAULT 0,
    `prize` JSON NULL,
    `timeline` JSON NULL,
    `social` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserModel` (
    `_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `mainWallet` VARCHAR(191) NOT NULL,
    `proof` JSON NULL,
    `email` VARCHAR(191) NOT NULL,
    `profilePicture` VARCHAR(500) NOT NULL,
    `tx` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isArchive` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UserModel_username_key`(`username`),
    UNIQUE INDEX `UserModel_mainWallet_key`(`mainWallet`),
    UNIQUE INDEX `UserModel_email_key`(`email`),
    FULLTEXT INDEX `UserModel_username_idx`(`username`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserKeys` (
    `_id` VARCHAR(191) NOT NULL,
    `publicKey` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isArchive` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UserKeys_publicKey_key`(`publicKey`),
    INDEX `UserKeys__id_idx`(`_id`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectsModel` (
    `_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `short_description` VARCHAR(2000) NOT NULL,
    `logo` VARCHAR(1000) NOT NULL,
    `owner_publickey` VARCHAR(191) NOT NULL,
    `sig` VARCHAR(191) NOT NULL DEFAULT '',
    `long_description` TEXT NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `project_link` VARCHAR(191) NOT NULL DEFAULT '',
    `twitter_handle` VARCHAR(191) NOT NULL DEFAULT '',
    `github_link` VARCHAR(191) NOT NULL DEFAULT '',
    `discord_link` VARCHAR(191) NOT NULL DEFAULT '',
    `telegram_link` VARCHAR(191) NOT NULL DEFAULT '',
    `projectUserCount` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('REVIEW', 'VERIFIED', 'FAILED') NOT NULL DEFAULT 'REVIEW',
    `failedReason` VARCHAR(191) NULL DEFAULT '',
    `mutliSigAddress` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isArchive` BOOLEAN NOT NULL DEFAULT false,

    INDEX `ProjectsModel_owner_publickey_idx`(`owner_publickey`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `projectsModelId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isArchive` BOOLEAN NOT NULL DEFAULT false,
    `hackathonId` VARCHAR(191) NULL,

    INDEX `Team_projectsModelId_idx`(`projectsModelId`),
    INDEX `Team_userId_idx`(`userId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectJoinRound` (
    `_id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `tx` VARCHAR(500) NOT NULL,
    `roundId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `amountRaise` DOUBLE NULL DEFAULT 0,
    `contributions` INTEGER NOT NULL DEFAULT 0,

    INDEX `ProjectJoinRound_projectId_idx`(`projectId`),
    INDEX `ProjectJoinRound_roundId_idx`(`roundId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Round` (
    `_id` VARCHAR(191) NOT NULL,
    `roundName` VARCHAR(191) NOT NULL,
    `matchedPool` DOUBLE NOT NULL DEFAULT 0,
    `notionPage` VARCHAR(500) NOT NULL,
    `projectCount` INTEGER NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `userId` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL DEFAULT '',
    `endTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `registrationEndDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `registrationStartDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tx` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `colorScheme` VARCHAR(191) NOT NULL DEFAULT 'teal',
    `short_description` VARCHAR(2000) NOT NULL DEFAULT '',
    `contributions` DOUBLE NOT NULL DEFAULT 0,
    `manager` VARCHAR(191) NOT NULL DEFAULT '',

    INDEX `Round_userId_idx`(`userId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sponsor` (
    `_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(500) NOT NULL,
    `roundId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Sponsor_roundId_idx`(`roundId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contribution` (
    `_id` VARCHAR(191) NOT NULL,
    `tx` VARCHAR(500) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `split` DOUBLE NOT NULL,
    `roundId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `currentTotal` DOUBLE NOT NULL,
    `currentusdTotal` DOUBLE NOT NULL,
    `isLatest` BOOLEAN NOT NULL DEFAULT true,
    `total` DOUBLE NOT NULL,
    `usdTotal` DOUBLE NOT NULL,
    `projectJoinRoundId` VARCHAR(191) NULL,

    INDEX `Contribution_projectId_idx`(`projectId`),
    INDEX `Contribution_roundId_idx`(`roundId`),
    INDEX `Contribution_userId_idx`(`userId`),
    INDEX `Contribution_projectJoinRoundId_idx`(`projectJoinRoundId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `_id` VARCHAR(191) NOT NULL,
    `comment` TEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `projectsModelId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Comments_userId_idx`(`userId`),
    INDEX `Comments_projectsModelId_idx`(`projectsModelId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reply` (
    `_id` VARCHAR(191) NOT NULL,
    `reply` TEXT NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,
    `replyUserId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Reply_commentId_idx`(`commentId`),
    INDEX `Reply_replyUserId_idx`(`replyUserId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
