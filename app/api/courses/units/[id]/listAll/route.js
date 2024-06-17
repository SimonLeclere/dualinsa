import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"

export async function GET(req, { params }) {
    
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })

    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }


    // Get checkpointId from query
    const courseId = +params.id

    // Select {checkpoints.questionPerTry} questions from QCMQuestions, FillInTheBlanksQuestion and TimedQuestion tables
    try {
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

        return NextResponse.json(units, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for units' }, { status: 500 });
    }
}