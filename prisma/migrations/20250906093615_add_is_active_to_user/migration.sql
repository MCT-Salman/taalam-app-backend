/*
  Warnings:

  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `birthDate` DATETIME(3) NOT NULL;
