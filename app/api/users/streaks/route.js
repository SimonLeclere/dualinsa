import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const GET = auth(async(req) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }


    // Get streak of user from query streakrecord table
    try {
        const streak = await prisma.streaksRecords.findMany({
            where: {
                userId: req.auth.user.id
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!streak) return NextResponse.json({ message: 'no streak found' }, { status: 404 });

        return NextResponse.json(streak, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error looking for streak' }, { status: 500 });
    }

})

export const POST = auth(async (req) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get the authenticated user
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.auth.user.id,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        const body = await req.json();

        if (!body.date) {
            return NextResponse.json({ message: 'Invalid input: date is required' }, { status: 400 });
        }

        // Add streak of user to StreakRecords table
        await prisma.streaksRecords.create({
            data: {
                userId: user.id,
                date: body.date,
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    } catch (error) {     
        return NextResponse.json({ message: 'Error looking for userCourse' }, { status: 500 });
    }
});