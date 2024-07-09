import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { auth } from "@/lib/auth"

export const GET = auth(async (req) => {
    
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

        // Obtient la date actuelle sans les heures, minutes, secondes, etc.
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Obtient la date de demain sans les heures, minutes, secondes, etc.
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const lastStreakToday = await prisma.streaksRecords.count({
            where: {
                userId: req.auth.user.id,
                date: {
                    gte: today,
                    lt: tomorrow,
                },
            },
            orderBy: {
                date: 'desc',
            },
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        // if no streak for today, return 0
        // else return dailyGoal

        if (lastStreakToday === 0) {
            // update dailyGoal asynchroniously
            prisma.user.update({
                where: { id: user.id },
                data: { dailyGoal: 0 },
            }).catch((error) => {
                console.log(error);
                throw error;
            });

            return NextResponse.json({ dailyGoal: 0, dailyGoalPreference: user.dailyGoalPreference });
        }

        // Return user.dailyGoal
        return NextResponse.json({ dailyGoal: user.dailyGoal, dailyGoalPreference: user.dailyGoalPreference })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for user' }, { status: 500 });
    }

});

// This is the POST method for the daily goal
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

        // Update the user.dailyGoal
        const { dailyGoalPreference } = await req.json();

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { dailyGoalPreference: dailyGoalPreference },
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        // Return the updated user.dailyGoal
        return NextResponse.json(updatedUser.dailyGoalPreference);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error updating user' }, { status: 500 });
    }

});