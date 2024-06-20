import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"

export async function GET(req) {
    
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })
    
    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get a list of all courses
    try {
        const enrolledCourses = await prisma.userCourse.findMany({
            where: {
                userId: token.user.id
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        const list = await prisma.courses.findMany().catch((error) => {
            console.log(error);
            throw error;
        });

        // for each course, check if the user is enrolled
        list.forEach(course => {
            course.isEnrolled = enrolledCourses.some(uc => uc.courseId === course.id);
        });
        
        if(!list) return NextResponse.json({ message: 'no courses found' }, { status: 404 });

        // Return user.streak
        return NextResponse.json(list);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for courses' }, { status: 500 });
    }


}