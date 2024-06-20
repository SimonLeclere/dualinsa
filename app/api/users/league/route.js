import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt";
import constantes from "@/lib/config.js";

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
                username: token.user.username,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        if(user.score < constantes.BRONZE_MAX) return NextResponse.json({ league: 'Bronze' });
        if(user.score < constantes.SILVER_MAX) return NextResponse.json({ league: 'Silver' });
        if(user.score < constantes.GOLD_MAX) return NextResponse.json({ league: 'Gold' });
        return NextResponse.json({ league: 'Diamond' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for user' }, { status: 500 });
    }


}