/*
  Warnings:

  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `sex` VARCHAR(191) NOT NULL;
