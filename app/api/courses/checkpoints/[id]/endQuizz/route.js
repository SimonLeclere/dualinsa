import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"

const compareDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // compare date, month and year using UTC
    return d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDate() === d2.getUTCDate();
}

export async function POST(req, { params }) {

    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })

    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get checkpointId from query
    const checkpointId = +params.id
    
    // Get score from body
    const { score } = await req.json()
    
    if (!checkpointId) return NextResponse.json({ message: 'No checkpointId provided' }, { status: 400 });
    if (!score && typeof score !== "number" && score !== 0) return NextResponse.json({ message: 'No score provided' }, { status: 400 });

    try {


        // L'utilisateur a complété un checkpoint

        // - Incrémenter User.score de score

        // - Si il n'existe pas encore de streakRecord pour aujourd'hui, créer un nouveau streakRecord et mettre User.dailyGoal à score
        // - Si il existe déjà un streakRecord pour aujourd'hui, incrémenter User.dailyGoal de score

        // - Si userCourse.currentCheckPointProgress < checkpoint.triesRequired, incrémenter userCourse.currentCheckPointProgress
        // - Si userCourse.currentCheckPointProgress === checkpoint.triesRequired :
        //     - Si checkpoint.index < unit.checkpoints.length, incrémenter userCourse.currentUnitCheckpointIndex et remettre userCourse.currentCheckPointProgress à 0
        //     - Si checkpoint.index === unit.checkpoints.length
        //         - Si userCourse.currentUnitIndex < course.units.length, incrémenter userCourse.currentUnitIndex et remettre userCourse.currentUnitCheckpointIndex et userCourse.currentCheckPointProgress à 0
        //         - Si userCourse.currentUnitIndex === course.units.length, on a terminé le cours

        // MARK: Récup. données

        const checkpoint = await prisma.checkpoints.findFirst({
            where: {
                id: checkpointId
            }
        });
        if (!checkpoint) return NextResponse.json({ message: 'Checkpoint not found' }, { status: 404 });

        const unit = await prisma.units.findFirst({
            include: {
                _count: {
                    select: { checkpoints: true }
                }
            },
            where: {
                id: checkpoint.unitId
            }
        });
        if (!unit) return NextResponse.json({ message: 'Unit not found' }, { status: 404 });

        const course = await prisma.courses.findFirst({
            include: {
                _count: {
                    select: { units: true }
                }
            },
            where: {
                id: unit?.courseId
            }
        });
        if (!course) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

        const userCourse = await prisma.userCourse.findFirst({
            where: {
                userId: token.user.id,
                courseId: course.id
            }
        });
        if (!userCourse) return NextResponse.json({ message: 'User course not found' }, { status: 404 });

        const user = await prisma.users.findFirst({
            where: {
                id: token?.user?.id
            }
        });
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });


        // MARK: Incrémenter score
        await prisma.users.update({
            where: {
                id: token?.user?.id
            },
            data: { score: { increment: score } } // Increment score by score
        });


        // MARK: streakRecord
        const lastStreakRecord = await prisma.streaksRecords.findFirst({
            where: {
                userId: token?.user?.id
            },
            orderBy: {
                date: 'desc'
            },
            take: 1
        });

        // Si il existe déjà un streakRecord pour aujourd'hui, incrémenter User.dailyGoal de score
        if (lastStreakRecord && compareDates(new Date(), lastStreakRecord.date)) {
            await prisma.users.update({
                where: {
                    id: token?.user?.id
                },
                data: {
                    dailyGoal: { increment: score } // Increment dailyGoal by score
                }
            });
        } else {
            // Si il n'existe pas encore de streakRecord pour aujourd'hui, créer un nouveau streakRecord et mettre User.dailyGoal à score
            await prisma.streaksRecords.create({
                data: {
                    userId: token?.user?.id,
                    date: new Date(),
                }
            });

            await prisma.users.update({
                where: {
                    id: token?.user?.id
                },
                data: { dailyGoal: score } // Set dailyGoal to score
            });
        }

        // MARK: Maj UserCourse

        if (userCourse.currentCheckpointProgress + 1 < checkpoint.triesRequired) {
            await prisma.userCourse.update({
                where: {
                    userId_courseId: {
                        userId: token?.user?.id,
                        courseId: course.id
                    }
                },
                data: { currentCheckpointProgress: { increment: 1 } } // Increment currentCheckPointProgress by 1
            });
        }

        else {

            if (checkpoint.index + 1 < unit._count.checkpoints) {
                await prisma.userCourse.update({
                    where: {
                        userId_courseId: {
                            userId: token?.user?.id,
                            courseId: course.id
                        }
                    },
                    data: {
                        currentUnitCheckpointIndex: { increment: 1 },
                        currentCheckpointProgress: 0
                    }
                });
            }

            else {
                if (userCourse.currentUnitIndex < course._count.units) {
                    await prisma.userCourse.update({
                        where: {
                            userId_courseId: {
                                userId: token?.user?.id,
                                courseId: course.id
                            }
                        },
                        data: {
                            currentUnitIndex: { increment: 1 },
                            currentUnitCheckpointIndex: 0,
                            currentCheckpointProgress: 0
                        }
                    });
                }

                else {
                    // On a terminé le cours

                }
            }
        }


        return NextResponse.json("updated", { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}