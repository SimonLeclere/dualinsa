/*
  Warnings:

  - You are about to drop the column `name` on the `Units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Units" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "UnitTranslation" (
    "id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UnitTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UnitTranslation_unitId_idx" ON "UnitTranslation"("unitId");
