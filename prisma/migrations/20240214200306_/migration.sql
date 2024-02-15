-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assigned_to_user_id_fkey`;

-- AlterTable
ALTER TABLE `issue` MODIFY `assigned_to_user_id` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigned_to_user_id_fkey` FOREIGN KEY (`assigned_to_user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
