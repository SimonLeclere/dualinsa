/*
  Warnings:

  - You are about to drop the column `streak` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "streak",
DROP COLUMN "xp",
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "StreaksRecords" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreaksRecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StreaksRecords_userId_idx" ON "StreaksRecords"("userId");
