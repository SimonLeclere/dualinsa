import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"

function maxConsecutiveConnections(connections) {
    if (!connections || connections.length === 0) return 0;


    // Step 1: Sort connections by date
    connections.sort((a, b) => new Date(a.date) - new Date(b.date));

    let maxConsecutive = 1;
    let currentConsecutive = 1;

    for (let i = 1; i < connections.length; i++) {
        let prevDate = new Date(connections[i - 1].date);
        let currentDate = new Date(connections[i].date);
        
        // Calculate the difference in days between the two dates
        let diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            currentConsecutive++;
        } else if (diffDays > 1) {
            currentConsecutive = 1;
        }

        if (currentConsecutive > maxConsecutive) {
            maxConsecutive = currentConsecutive;
        }
    }

    return maxConsecutive;
}

export async function GET(req) {
    
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })
    
    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }

    // Get streak of user from query streakrecord table
    try {
        const streaks = await prisma.streaksRecords.findMany({
            where: {
                userId: token.user.id
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!streaks) return NextResponse.json({ message: 'no streak found' }, { status: 404 });

        const max = maxConsecutiveConnections(streaks);

        return NextResponse.json(max, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error looking for streak' }, { status: 500 });
    }

}
