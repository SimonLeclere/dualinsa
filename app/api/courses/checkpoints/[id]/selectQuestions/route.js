import { NextResponse } from 'next/server';
import prisma from '@/lib/supabase';
import { getToken } from "next-auth/jwt"

export async function GET(req, { params }) {
    
    // Verify if the request comes from an authenticated user
    const token = await getToken({ req })

    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }


    // Get checkpointId from query
    const checkpointId = +params.id

    // Select {checkpoints.questionPerTry} questions from QCMQuestions, FillInTheBlanksQuestion and TimedQuestion tables
    try {
        const questions = await prisma.checkpoints.findUnique({
            where: {
                id: checkpointId
            },
            select: {
                questionsPerTry: true,
                QCMQuestion: {
                    select: {
                        id: true,
                        question: true,
                        answers: true,
                        correctAnswer: true,
                        duration:true
                    }
                },
                FillInTheBlanksQuestion: {
                    select: {
                        id: true,
                        question: true,
                        textWithHoles: true,
                        propositions: true,
                        correctAnswer: true,
                        duration: true
                    }
                },
                TimedQuestion: {
                    select: {
                        id: true,
                        question: true,
                        aiPromptSolution: true,
                        duration: true
                    }
                }
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
        
        if(!questions) return NextResponse.json({ message: 'no questions found' }, { status: 404 });

        // Return 5 randoms questions from all questions
        const allQuestions = questions.QCMQuestion.concat(questions.FillInTheBlanksQuestion, questions.TimedQuestion);
        const randomQuestions = allQuestions.sort(() => Math.random() - Math.random()).slice(0, questions.questionsPerTry);
        return NextResponse.json(randomQuestions, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message : 'Error looking for questions' }, { status: 500 });
    }
}