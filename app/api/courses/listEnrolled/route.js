import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const GET = auth(async (req) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get a list of courses the user is enrolled in
    try {
        const list = await prisma.userCourse.findMany({
            where: {
                userId: req.auth.id
            },
            include: {
                course: true
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!list) return NextResponse.json({ message: 'no courses found' }, { status: 404 });

        // Return user.streak
        return NextResponse.json(list);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for courses' }, { status: 500 });
    }
});
