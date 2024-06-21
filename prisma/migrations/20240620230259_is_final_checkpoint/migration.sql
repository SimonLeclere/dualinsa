-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "dailyGoal" INTEGER NOT NULL DEFAULT 0,
    "dailyGoalPreference" INTEGER NOT NULL DEFAULT 20,
    "lastCourse" INTEGER NOT NULL DEFAULT 0,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT NOT NULL DEFAULT 'fr',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreaksRecords" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreaksRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourse" (
    "currentUnitIndex" INTEGER NOT NULL DEFAULT 0,
    "currentUnitCheckpointIndex" INTEGER NOT NULL DEFAULT 0,
    "currentCheckpointProgress" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "celeneLink" TEXT,
    "department" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checkpoints" (
    "id" SERIAL NOT NULL,
    "index" INTEGER NOT NULL,
    "questionsPerTry" INTEGER NOT NULL,
    "triesRequired" INTEGER NOT NULL,
    "isFinalCheckpoint" BOOLEAN NOT NULL DEFAULT false,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "Checkpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FillInTheBlanksQuestion" (
    "id" SERIAL NOT NULL,
    "checkpointId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "textWithHoles" TEXT NOT NULL,
    "propositions" TEXT[],
    "correctAnswer" TEXT[],
    "duration" INTEGER NOT NULL,

    CONSTRAINT "FillInTheBlanksQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimedQuestion" (
    "id" SERIAL NOT NULL,
    "checkpointId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "aiPromptSolution" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "TimedQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QCMQuestion" (
    "id" SERIAL NOT NULL,
    "checkpointId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "QCMQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE INDEX "StreaksRecords_userId_idx" ON "StreaksRecords"("userId");

-- CreateIndex
CREATE INDEX "UserCourse_courseId_idx" ON "UserCourse"("courseId");

-- CreateIndex
CREATE INDEX "UserCourse_userId_idx" ON "UserCourse"("userId");

-- CreateIndex
CREATE INDEX "Units_courseId_idx" ON "Units"("courseId");

-- CreateIndex
CREATE INDEX "Checkpoints_unitId_idx" ON "Checkpoints"("unitId");

-- CreateIndex
CREATE INDEX "FillInTheBlanksQuestion_checkpointId_idx" ON "FillInTheBlanksQuestion"("checkpointId");

-- CreateIndex
CREATE INDEX "TimedQuestion_checkpointId_idx" ON "TimedQuestion"("checkpointId");

-- CreateIndex
CREATE INDEX "QCMQuestion_checkpointId_idx" ON "QCMQuestion"("checkpointId");
