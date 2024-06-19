import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"


export async function GET(req, { params }) {
        
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
    
            // Get currentUnitIndex and currentCheckpointIndex of userCourse table
            const userCourse = await prisma.userCourse.findUnique({
                where: {
                    userId: user.id,
                    courseId: +params.id
                }
            }).catch((error) => {
                console.log(error);
                throw error;
            });
    
            if(!userCourse) return NextResponse.json({ message: 'No course found' }, { status: 404 });
    
            return NextResponse.json(userCourse, { status: 200 });
    
        } catch (error) {
            return NextResponse.json({ message: 'Error looking for user' }, { status: 500 });
        }
    
    }
