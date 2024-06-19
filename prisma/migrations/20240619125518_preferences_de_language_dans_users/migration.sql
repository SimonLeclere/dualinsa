/*
  Warnings:

  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `index` to the `Checkpoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoints" ADD COLUMN     "index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'fr';

-- DropTable
DROP TABLE "Preferences";
