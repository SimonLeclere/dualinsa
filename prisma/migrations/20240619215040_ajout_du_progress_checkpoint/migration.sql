/*
  Warnings:

  - You are about to drop the column `completed` on the `Checkpoints` table. All the data in the column will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `index` to the `Checkpoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoints" DROP COLUMN "completed",
ADD COLUMN     "index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserCourse" ADD COLUMN     "currentCheckpointProgress" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'fr';

-- DropTable
DROP TABLE "Preferences";
