import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const GET = auth(async (req) => {
    
    if (!req.auth) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get the authenticated user
    try {
        const users = await prisma.user.findMany(
            {
                select: {
                    id: true,
                    username: true,
                    score: true,
                },
            }
        )
            .catch((error) => {
                console.log(error);
                throw error;
            });
        
        if(!users) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        return NextResponse.json(users, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for user' }, { status: 500 });
    }

});