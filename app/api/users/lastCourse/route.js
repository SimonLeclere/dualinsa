import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const GET = auth(async (req) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get the authenticated user
    try {
        const lastCourse = await prisma.user.findUnique({
            select : {
                lastCourse: true,
            },
            where: {
                id: req.auth.user.id,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!lastCourse) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        // Return user.lastCourse
        return NextResponse.json(lastCourse, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for user' }, { status: 500 });
    }
});

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

        // Update user.lastCourse
        const { lastCourse } = await req.json();
        const updatedUser = await prisma.user.update({
            where: { id: req.auth.user.id },
            data: { lastCourse },
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        // Return updated user
        return NextResponse.json(updatedUser.lastCourse, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error setting user.lastCourse' }, { status: 500 });
    }
});