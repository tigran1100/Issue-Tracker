/*
  Warnings:

  - Added the required column `assigned_to_user` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assigned_to_user` VARCHAR(255) NOT NULL;
