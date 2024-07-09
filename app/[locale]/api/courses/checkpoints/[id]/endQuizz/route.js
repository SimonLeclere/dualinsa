import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt";

const compareDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // compare date, month and year using UTC
    return d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDate() === d2.getUTCDate();
}

export async function POST(req, { params }) {
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get checkpointId from query
    const checkpointId = +params.id;

    // Get score from body
    const { score } = await req.json();

    if (!checkpointId) return NextResponse.json({ message: 'No checkpointId provided' }, { status: 400 });
    if (score === undefined || score === null || typeof score !== "number") return NextResponse.json({ message: 'No score provided' }, { status: 400 });

    try {
        // Fetch checkpoint and user data in parallel
        const [checkpoint, user] = await Promise.all([
            prisma.checkpoints.findFirst({ where: { id: checkpointId } }),
            prisma.user.findFirst({ where: { id: token.user.id } }),
        ]);

        if (!checkpoint) return NextResponse.json({ message: 'Checkpoint not found' }, { status: 404 });
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        // Fetch unit and course data
        const unit = await prisma.units.findFirst({
            include: { _count: { select: { checkpoints: true } } },
            where: { id: checkpoint.unitId }
        });
        if (!unit) return NextResponse.json({ message: 'Unit not found' }, { status: 404 });

        const course = await prisma.courses.findFirst({
            include: { _count: { select: { units: true } } },
            where: { id: unit.courseId }
        });
        if (!course) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

        const userCourse = await prisma.userCourse.findFirst({
            where: { userId: token.user.id, courseId: course.id }
        });
        if (!userCourse) return NextResponse.json({ message: 'User course not found' }, { status: 404 });

        // Check for existing streak record for today
        const today = new Date();
        const lastStreakRecord = await prisma.streaksRecords.findFirst({
            where: { userId: token.user.id },
            orderBy: { date: 'desc' },
            take: 1
        });

        // Use a transaction to ensure atomic updates
        await prisma.$transaction(async (prisma) => {
            // Increment user score
            await prisma.user.update({
                where: { id: token.user.id },
                data: { score: { increment: score } }
            });

            // Update dailyGoal and create a streak record if necessary
            if (lastStreakRecord && compareDates(today, lastStreakRecord.date)) {
                await prisma.user.update({
                    where: { id: token.user.id },
                    data: { dailyGoal: { increment: score } }
                });
            } else {
                await prisma.streaksRecords.create({
                    data: { userId: token.user.id, date: today }
                });
                await prisma.user.update({
                    where: { id: token.user.id },
                    data: { dailyGoal: score }
                });
            }

            // if usercourse.currentUnitCheckpointIndex and usercourse.currentunitIndex are not equal to the checkpoint index and unit index, don't update progress
            if (userCourse.currentUnitIndex !== unit.index - 1 || userCourse.currentUnitCheckpointIndex !== checkpoint.index) {
                return;
            }

            // Update userCourse progress
            if (userCourse.currentCheckpointProgress + 1 < checkpoint.triesRequired) {
                await prisma.userCourse.update({
                    where: { userId_courseId: { userId: token.user.id, courseId: course.id } },
                    data: { currentCheckpointProgress: { increment: 1 } }
                });
            } else {
                if (checkpoint.index + 1 < unit._count.checkpoints) {
                    await prisma.userCourse.update({
                        where: { userId_courseId: { userId: token.user.id, courseId: course.id } },
                        data: { currentUnitCheckpointIndex: { increment: 1 }, currentCheckpointProgress: 0 }
                    });
                } else {
                    if (userCourse.currentUnitIndex < course._count.units) {
                        await prisma.userCourse.update({
                            where: { userId_courseId: { userId: token.user.id, courseId: course.id } },
                            data: { currentUnitIndex: { increment: 1 }, currentUnitCheckpointIndex: 0, currentCheckpointProgress: 0 }
                        });
                    } else {
                        // Course completed
                    }
                }
            }
        });

        return NextResponse.json("updated", { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
