-- AlterTable
ALTER TABLE "FillInTheBlanksQuestion" ALTER COLUMN "duration" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QCMQuestion" ALTER COLUMN "duration" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TimedQuestion" ALTER COLUMN "duration" DROP NOT NULL;
