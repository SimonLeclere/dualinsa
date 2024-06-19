const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('./data.json');  // Ensure this path is correct

async function main() {

    const course = await prisma.courses.create({
        data: {
            name: data.name,
            celeneLink: data.celeneLink,
            department: data.department,
            semester: data.semester,
            description: data.description,
            units: {
                create: data.units.map(unit => ({
                    index: unit.index,
                    name: unit.name,
                    checkpoints: {
                        create: unit.checkpoints.map(checkpoint => (
                            {
                                index: checkpoint.index,
                                questionsPerTry: checkpoint.questionsPerTry,
                                triesRequired: checkpoint.triesRequired,
                                FillInTheBlanksQuestion: {
                                    create: checkpoint.FillInTheBlanksQuestion.map(question => ({
                                        question: question.question,
                                        textWithHoles: question.textWithHoles,
                                        propositions: question.propositions,
                                        correctAnswer: question.correctAnswer,
                                        duration: question.duration
                                    }))
                                },
                                QCMQuestion: {
                                    create: checkpoint.QCMQuestion.map(question => ({
                                        question: question.question,
                                        answers: question.answers,
                                        correctAnswer: question.answer,
                                        duration: question.duration
                                    }))
                                },
                                TimedQuestion: {
                                    create: checkpoint.TimedQuestion.map(question => ({
                                        question: question.question,
                                        aiPromptSolution: question.aiPromptSolution,
                                        duration: question.duration
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