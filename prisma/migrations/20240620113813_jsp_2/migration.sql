/*
  Warnings:

  - You are about to drop the column `currentUnitCheckpointProgress` on the `UserCourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserCourse" DROP COLUMN "currentUnitCheckpointProgress",
ADD COLUMN     "currentCheckpointProgress" INTEGER NOT NULL DEFAULT 0;
