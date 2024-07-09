import { NextResponse } from 'next/server';
import prisma from '/lib/supabase';
import { getToken } from "next-auth/jwt"

export async function GET(req, { params }) {

    // Verify if the request comes from an authenticated user
    const token = await getToken({ req, params })

    if (!token) {
        return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
    }


    // Get checkpointId from query
    const checkpointId = +params.id
    const locale = params.locale || 'fr'; // TODO: write question in the user's language

    try {
        const checkpoint = await prisma.checkpoints.findUnique({
            where: {
                id: checkpointId
            },
            select: {
                questionsPerTry: true,
                QCMQuestion: {
                    include: {
                        QCMQuestionTranslation: true
                    }
                },
                FillInTheBlanksQuestion: {
                    include: {
                        FillInTheBlanksQuestionTranslation: true
                    }
                },
                TimedQuestion: {
                    include: {
                        TimedQuestionTranslation: true
                    }
                }
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });

        if (!checkpoint) return NextResponse.json({ message: 'no questions found' }, { status: 404 });

        console.log("checkpoint qcmQuestion");
        // Add all fields of the QCMQuestionTranslation object corresponding to the user's locale to the QCMQuestion object, except the id, QCMQuestionId and locale fields
        checkpoint.QCMQuestion.forEach(question => {
            question.QCMQuestionTranslation.forEach(translation => {
                if (translation.language === locale) {
                    for (const [key, value] of Object.entries(translation)) {
                        if (!['id', 'QCMQuestionId', 'language'].includes(key)) {
                            question[key] = value;
                        }
                    }
                }
            });

            // delete the QCMQuestionTranslation field
            delete question.QCMQuestionTranslation;

            // Add a "type" field
            question.type = "QCM";

            // Shuffle answers
            question.answers = question.answers.sort(() => Math.random() - 0.5);
        });

        console.log("checkpoint FillInTheBlanksQuestion");
        // Add all fields of the FillInTheBlanksQuestionTranslation object corresponding to the user's locale to the FillInTheBlanksQuestion object, except the id, FillInTheBlanksQuestionId and locale fields
        checkpoint.FillInTheBlanksQuestion.forEach(question => {
            question.FillInTheBlanksQuestionTranslation.forEach(translation => {
                if (translation.language === locale) {
                    for (const [key, value] of Object.entries(translation)) {
                        if (!['id', 'FillInTheBlanksQuestionId', 'language'].includes(key)) {
                            question[key] = value;
                        }
                    }
                }

            });
            // delete the FillInTheBlanksQuestionTranslation field
            delete question.FillInTheBlanksQuestionTranslation;

            // Add a "type" field
            question.type = "FILL_IN_THE_BLANKS";

            // Shuffle propositions
            question.propositions = question.propositions.sort(() => Math.random() - 0.5);
        });

        console.log("checkpoint TimedQuestion");
        // Add all fields of the TimedQuestionTranslation object corresponding to the user's locale to the TimedQuestion object, except the id, TimedQuestionId and locale fields
        checkpoint.TimedQuestion.forEach(question => {
            question.TimedQuestionTranslation.forEach(translation => {
                if (translation.language === locale) {
                    for (const [key, value] of Object.entries(translation)) {
                        if (!['id', 'TimedQuestionId', 'language'].includes(key)) {
                            question[key] = value;
                        }
                    }
                }
            });
            // Add a "type" field
            question.type = "TIMED";

            // delete the TimedQuestionTranslation field
            delete question.TimedQuestionTranslation;
        });

        // Return 5 randoms questions from all questions
        const allQuestions = checkpoint.QCMQuestion.concat(checkpoint.FillInTheBlanksQuestion, checkpoint.TimedQuestion);
        const randomQuestions = allQuestions.sort(() => Math.random() - Math.random()).slice(0, checkpoint.questionsPerTry);
        return NextResponse.json(randomQuestions, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error looking for questions' }, { status: 500 });
    }
}