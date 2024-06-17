/*
  Warnings:

  - The primary key for the `UserCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserCourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "celeneLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("userId", "courseId");
