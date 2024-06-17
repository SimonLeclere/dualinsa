/*
  Warnings:

  - Added the required column `index` to the `Checkpoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoints" ADD COLUMN     "index" INTEGER NOT NULL;
