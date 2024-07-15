/*
  Warnings:

  - You are about to drop the column `trainerId` on the `Support` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Support` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Support` DROP FOREIGN KEY `Support_trainerId_fkey`;

-- AlterTable
ALTER TABLE `Support` DROP COLUMN `trainerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Support` ADD CONSTRAINT `Support_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
