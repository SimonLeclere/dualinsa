import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const GET = auth(async (req, { params }) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get courseId from slug
    const courseId = +params.id
    const locale = params?.locale || 'fr'; // TODO

    if (!courseId) return NextResponse.json({ message: 'Invalid course id' }, { status: 400 });	

    // Select {checkpoints.questionPerTry} questions from QCMQuestions, FillInTheBlanksQuestion and TimedQuestion tables
    try {
        // Check if the user is enrolled in the course
        const userCourse = await prisma.userCourse.findUnique({
            where: {
                userId_courseId : {
                    userId: req.auth.user.id,
                    courseId: courseId
                }
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
                unitTranslation : true,
                checkpoints : true
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!units) return NextResponse.json({ message: 'no units found' }, { status: 404 });


        units.forEach(unit => {
            // Add all fields of the unitTranslation object corresponding to the user's locale to the unit object, except the id, unitId and locale fields
            unit.unitTranslation.forEach(translation => {
                if(translation.language === locale) {
                    for (const [key, value] of Object.entries(translation)) {
                        if (!['id', 'unitId', 'language'].includes(key)) {
                            unit[key] = value;
                        }
                    }
                }
            });

            // if some fields of unit object are empty, fill them with the default translation
            Object.keys(unit).forEach(key => {
                if (unit[key] === null || unit[key] === '') {
                    const defaultTranslation = unit.unitTranslation.find(translation => translation[key] !== null && translation[key] !== '');
                    unit[key] = defaultTranslation && defaultTranslation[key] || null;
                }
            });

            // Remove the unitTranslation field from the unit object
            delete unit.unitTranslation;
        });

        
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
});