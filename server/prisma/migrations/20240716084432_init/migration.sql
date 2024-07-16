/*
  Warnings:

  - You are about to drop the column `trainerId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_trainerId_fkey`;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `trainerId`;

-- CreateTable
CREATE TABLE `_UserToSession` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserToSession_AB_unique`(`A`, `B`),
    INDEX `_UserToSession_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserToSession` ADD CONSTRAINT `_UserToSession_A_fkey` FOREIGN KEY (`A`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToSession` ADD CONSTRAINT `_UserToSession_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
