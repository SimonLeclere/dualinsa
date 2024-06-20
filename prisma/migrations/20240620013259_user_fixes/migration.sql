/*
  Warnings:

  - You are about to drop the column `completed` on the `Checkpoints` table. All the data in the column will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Checkpoints" DROP COLUMN "completed";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "dailyGoalPreference" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'fr';

-- DropTable
DROP TABLE "Preferences";
