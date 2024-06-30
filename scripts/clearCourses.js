// Importez PrismaClient depuis @prisma/client
const { PrismaClient } = require('@prisma/client');

// Initialisez une instance de PrismaClient
const prisma = new PrismaClient();

async function clearTables() {
    try {
        
        await prisma.$transaction([

            prisma.qCMQuestionTranslation.deleteMany(),
            prisma.fillInTheBlanksQuestionTranslation.deleteMany(),
            prisma.unitTranslation.deleteMany(),

            prisma.qCMQuestion.deleteMany(),
            prisma.fillInTheBlanksQuestion.deleteMany(),
            prisma.timedQuestion.deleteMany(),

            prisma.checkpoints.deleteMany(),
            prisma.units.deleteMany(),

            prisma.courseTranslation.deleteMany(),
            prisma.userCourse.deleteMany(),
            prisma.courses.deleteMany(),
            
        ]);

        console.log('Tables vidées avec succès.');

    } catch (error) {
        console.error('Erreur lors de la suppression des données :', error);

    } finally {
        // Déconnectez PrismaClient après utilisation
        await prisma.$disconnect();
    }
}

// Appelez la fonction pour vider les tables
clearTables();
