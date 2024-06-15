-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "dailyGoal" INTEGER NOT NULL,
    "streak" TEXT[],
    "creationDate" TIMESTAMP(3) NOT NULL,
    "avatar" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" BIGSERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourse" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "courseId" BIGINT NOT NULL,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "celeneLink" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Units" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" BIGINT NOT NULL,
    "courseId" BIGINT NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checkpoints" (
    "id" BIGSERIAL NOT NULL,
    "advancement" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "questionsPerTry" INTEGER NOT NULL,
    "triesRequired" BIGINT NOT NULL,
    "unitId" BIGINT NOT NULL,

    CONSTRAINT "Checkpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FillInTheBlanksQuestion" (
    "id" BIGSERIAL NOT NULL,
    "checkpointId" BIGINT NOT NULL,
    "question" TEXT NOT NULL,
    "textWithHoles" TEXT NOT NULL,
    "propositions" TEXT[],
    "correctAnswer" TEXT[],
    "duration" INTEGER NOT NULL,

    CONSTRAINT "FillInTheBlanksQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimedQuestion" (
    "id" BIGSERIAL NOT NULL,
    "checkpointId" BIGINT NOT NULL,
    "question" TEXT NOT NULL,
    "aiPromptSolution" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "TimedQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QCMQuestion" (
    "id" BIGSERIAL NOT NULL,
    "checkpointId" BIGINT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "QCMQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Preferences_userId_idx" ON "Preferences"("userId");

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
