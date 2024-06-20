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

        // Return user
        delete user.hash;
        delete user.salt;
        return NextResponse.json(user, { status: 200 });

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
        const user = await prisma.users.findUnique({
            where: {
                id: token.user.id,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });


        const body = await req.json();

        // Update user
        let { username, language, avatar } = body;
        
        username = username.trim();
        
        if (!username || !language) {
            return NextResponse.json({ message: 'Invalid input: username, language and avatar are required' }, { status: 400 });
        }

        if(!avatar) avatar = -1;

        const updatedUser = await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                username,
                language,
                avatar,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        // Return user
        delete updatedUser.hash;
        delete updatedUser.salt;
        return NextResponse.json(updatedUser, { status: 200 });

    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            return NextResponse.json({ message: 'Username already taken' }, { status: 400 });
        }
        return NextResponse.json({ message : 'Error updating user' }, { status: 500 });
    }
}