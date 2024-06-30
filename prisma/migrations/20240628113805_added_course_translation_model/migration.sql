-- CreateTable
CREATE TABLE "CourseTranslation" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CourseTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseTranslation_courseId_idx" ON "CourseTranslation"("courseId");
