const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('./data.json');  // Ensure this path is correct

async function main() {

    const course = await prisma.courses.create({
        data: {
            celeneLink: data.celeneLink,
            department: data.department,
            semester: data.semester,

            courseTranslation: {
                create: data.translations.map(translation => ({
                    language: translation.language,
                    name: translation.name,
                    description: translation.description
                })),
            },

            units: {
                create: data.units.map(unit => ({
                    index: unit.index,
                    
                    unitTranslation: {
                        create: unit.translations.map(translation => ({
                            language: translation.language,
                            name: translation.name,
                        }))
                    },

                    checkpoints: {
                        create: unit.checkpoints.map(checkpoint => (
                            {
                                index: checkpoint.index,
                                questionsPerTry: checkpoint.questionsPerTry,
                                triesRequired: checkpoint.triesRequired,
                                FillInTheBlanksQuestion: {
                                    create: checkpoint.FillInTheBlanksQuestion.map(question => ({
                                        duration: question.duration,
                                        FillInTheBlanksQuestionTranslation: {
                                            create: question.translations.map(translation => ({
                                                language: translation.language,
                                                question: translation.question,
                                                textWithHoles: translation.textWithHoles,
                                                propositions: translation.propositions,
                                                correctAnswer: translation.correctAnswer
                                            }))
                                        }
                                    }))
                                },
                                QCMQuestion: {
                                    create: checkpoint.QCMQuestion.map(question => ({
                                        duration: question.duration,
                                        QCMQuestionTranslation: {
                                            create: question.translations.map(translation => ({
                                                language: translation.language,
                                                question: translation.question,
                                                answers: translation.answers,
                                                correctAnswer: translation.answer
                                            }))
                                        }
                                    }))
                                },
                                TimedQuestion: {
                                    create: checkpoint.TimedQuestion.map(question => ({
                                        duration: question.duration,

                                        TimedQuestionTranslation: {
                                            create: question.translations.map(translation => ({
                                                language: translation.language,
                                                question: translation.question,
                                                aiPromptSolution: translation.aiPromptSolution,
                                            }))
                                        }
                                    }))
                                }
                            }))
                    }
                }))
            }
        }
    });
    console.log(`Created course with id: ${course.id}`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });