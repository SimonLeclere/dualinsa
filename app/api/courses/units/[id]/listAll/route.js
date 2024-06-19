import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"

export async function GET(req, { params }) {
    
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })

    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }


    // Get courseId from slug
    const courseId = +params.id

    // Select {checkpoints.questionPerTry} questions from QCMQuestions, FillInTheBlanksQuestion and TimedQuestion tables
    try {
        // Check if the user is enrolled in the course
        const userCourse = await prisma.userCourse.findUnique({
            where: {
                userId: user.id,
                courseId: courseId
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        if(!userCourse) return NextResponse.json({ message: 'User not enrolled in this course' }, { status: 404 });

        // Get all units of the course
        const units = await prisma.units.findMany({
            where: {
                courseId: courseId
            },
            include : {
                checkpoints : true
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!units) return NextResponse.json({ message: 'no units found' }, { status: 404 });
        
        delete userCourse.userId;
        delete userCourse.courseId;


        const response = {
            advancement : userCourse,
            units : units
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for units' }, { status: 500 });
    }
}