import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"

export async function GET(req) {
    
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })
    
    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get the authenticated user
    try {
        const lastCourse = await prisma.user.findUnique({
            select : {
                lastCourse: true,
            },
            where: {
                id: token.user.id,
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
}

export async function POST(req) {
    const token = await getToken({ req })
    
    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get the authenticated user
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: token.user.id,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        // Update user.lastCourse
        const { lastCourse } = await req.json();
        const updatedUser = await prisma.user.update({
            where: { id: token.user.id },
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
}