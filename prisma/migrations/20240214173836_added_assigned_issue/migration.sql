/*
  Warnings:

  - You are about to drop the column `assigned_to_user` on the `issue` table. All the data in the column will be lost.
  - Added the required column `assigned_to_user_id` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` DROP COLUMN `assigned_to_user`,
    ADD COLUMN `assigned_to_user_id` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigned_to_user_id_fkey` FOREIGN KEY (`assigned_to_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
