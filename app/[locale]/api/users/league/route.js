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
        const user = await prisma.user.findUnique({
            where: {
                id: token.user.id,
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });


        const users = await prisma.user.findMany({
            orderBy: {
              score: 'desc',
            },
            select: {
              id: true,
            },
          });

        if (!users) return NextResponse.json({ message: 'No users found' }, { status: 404 });

        const totalUsersCount = users.length;

        const userRank = users.findIndex((u) => u.id === user.id) + 1;

        if(user.score < constantes.BRONZE_MAX) return NextResponse.json({ league: 'Bronze', rank: userRank, totalUsers: totalUsersCount });
        if(user.score < constantes.SILVER_MAX) return NextResponse.json({ league: 'Silver', rank: userRank, totalUsers: totalUsersCount });
        if(user.score < constantes.GOLD_MAX) return NextResponse.json({ league: 'Gold', rank: userRank, totalUsers: totalUsersCount });
        return NextResponse.json({ league: 'Diamond', rank: userRank, totalUsers: totalUsersCount });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for user' }, { status: 500 });
    }


}