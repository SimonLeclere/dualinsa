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
        const user = await prisma.users.findUnique({
            where: {
                id: token.user.id,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        // Return user.dailyGoal
        return NextResponse.json(user.dailyGoal);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for user' }, { status: 500 });
    }


}

// This is the POST method for the daily goal
export async function POST(req) {
    
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })
    
    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get the authenticated user
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: token.user.id,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        // Update the user.dailyGoal
        const { dailyGoal } = await req.body.json();
        const updatedUser = await prisma.users.update({
            where: { id: user.id },
            data: { dailyGoal: dailyGoal },
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        // Return the updated user.dailyGoal
        return NextResponse.json(updatedUser.dailyGoal);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error updating user' }, { status: 500 });
    }

}