import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const POST = auth(async (req) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    const body = await req.json();

    const { course_id } = body;
    const user_id = req.auth.user.id;

    if (!course_id) return NextResponse.json({ message: 'Missing course_id' }, { status: 400 });

    // check if the course exists
    try {
            const existing = await prisma.courses.findUnique({
                where: {
                    id: +course_id
                },
            }).catch((error) => {
                console.log(error);
                throw error;
            });
    
            if(!existing) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

        } catch (error) { 
            return NextResponse.json({ message : 'Error looking for course' }, { status: 500 });
        }
    

    // check if the user is already enrolled in the course
    try {
        const existing = await prisma.userCourse.findUnique({
            where: {
                userId_courseId : {
                    userId: user_id,
                    courseId: +course_id
                }
                },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        if(existing) return NextResponse.json({ message: 'User already enrolled in course' }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ message : 'Error looking for enrollment' }, { status: 500 });
    }
    

    // enroll the user in the course
    try {
        await prisma.userCourse.create({
            data: {
                courseId: +course_id,
                userId: user_id
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        return NextResponse.json({ message: 'User enrolled in course' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error enrolling user in course' }, { status: 500 });
    }
});
