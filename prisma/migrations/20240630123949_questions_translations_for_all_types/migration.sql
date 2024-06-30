/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `FillInTheBlanksQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `propositions` on the `FillInTheBlanksQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `FillInTheBlanksQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `textWithHoles` on the `FillInTheBlanksQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `answers` on the `QCMQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswer` on the `QCMQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `QCMQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `aiPromptSolution` on the `TimedQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `TimedQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FillInTheBlanksQuestion" DROP COLUMN "correctAnswer",
DROP COLUMN "propositions",
DROP COLUMN "question",
DROP COLUMN "textWithHoles";

-- AlterTable
ALTER TABLE "QCMQuestion" DROP COLUMN "answers",
DROP COLUMN "correctAnswer",
DROP COLUMN "question";

-- AlterTable
ALTER TABLE "TimedQuestion" DROP COLUMN "aiPromptSolution",
DROP COLUMN "question";

-- CreateTable
CREATE TABLE "FillInTheBlanksQuestionTranslation" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "textWithHoles" TEXT NOT NULL,
    "propositions" TEXT[],
    "correctAnswer" TEXT[],

    CONSTRAINT "FillInTheBlanksQuestionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimedQuestionTranslation" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "aiPromptSolution" TEXT NOT NULL,

    CONSTRAINT "TimedQuestionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QCMQuestionTranslation" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "QCMQuestionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FillInTheBlanksQuestionTranslation_questionId_idx" ON "FillInTheBlanksQuestionTranslation"("questionId");

-- CreateIndex
CREATE INDEX "TimedQuestionTranslation_questionId_idx" ON "TimedQuestionTranslation"("questionId");

-- CreateIndex
CREATE INDEX "QCMQuestionTranslation_questionId_idx" ON "QCMQuestionTranslation"("questionId");
