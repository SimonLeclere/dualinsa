/*
  Warnings:

  - You are about to drop the column `description` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "description",
DROP COLUMN "name";
