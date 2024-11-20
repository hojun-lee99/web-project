/*
  Warnings:

  - Added the required column `categoryId` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articles` ADD COLUMN `categoryId` INTEGER NOT NULL;
