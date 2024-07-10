import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const GET = auth(async (req, { params}) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    const locale = req?.nextUrl?.searchParams?.get('locale') || 'fr';

    // Get a list of all courses
    try {
        const enrolledCourses = await prisma.userCourse.findMany({
            select: {
                courseId: true
            },
            where: {
                userId: req.auth.user.id
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        const list = await prisma.courses.findMany({
            include: {
                courseTranslation: true
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        list.forEach(course => {
            // Check if the user is enrolled in the course
            course.isEnrolled = enrolledCourses.some(uc => uc.courseId === course.id);

            // Add all fields of the courseTranslation object corresponding to the user's locale to the course object, except the id, courseId and locale fields
            course.courseTranslation.forEach(translation => {
                if(translation.language === locale) {
                    for (const [key, value] of Object.entries(translation)) {
                        if (!['id', 'courseId', 'language'].includes(key)){
                            course[key] = value;
                        }
                    }
                }
            });

            // if some fields of course object are empty, fill them with the default translation
            Object.keys(course).forEach(key => {
                if (course[key] === null || course[key] === '') {
                    const defaultTranslation = course.courseTranslation.find(translation => translation[key] !== null && translation[key] !== '');
                    course[key] = defaultTranslation && defaultTranslation[key] || null;
                }
            });

            // Remove the courseTranslation field from the course object
            delete course.courseTranslation;
            
        });
        
        if(!list) return NextResponse.json({ message: 'no courses found' }, { status: 404 });

        // Return user.streak
        return NextResponse.json(list);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for courses' }, { status: 500 });
    }

});
