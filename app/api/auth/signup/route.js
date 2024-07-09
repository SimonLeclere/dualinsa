import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';


export async function POST(req) {

    const body = await req.json();

    const { username, hashedPassword, salt } = body;
    
    if (!username || !hashedPassword || !salt) return NextResponse.json({ message: 'Missing username, password hash or salt' }, { status: 400 });

    // check if there is already a user with the same username
    const existingUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

    try {
        const user = await prisma.user.create({
            data: {
              username: username,
              hashedPassword: hashedPassword,
              salt: salt,
            },
          }).catch((error) => {
            console.log(error);
            throw error;
        });

        return NextResponse.json({ message: 'User created' }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}
