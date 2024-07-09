const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { faker } = require('@faker-js/faker');


const createRandomUser = () => {
    const dailyGoalPreference = faker.helpers.arrayElement([10, 20, 30, 50, 500, 5000]);
    const dailyGoal = faker.number.int({ min: 0, max: dailyGoalPreference });

    return {
        username: faker.internet.userName(),
        hashedPassword: faker.internet.password(),
        salt: faker.internet.password(),
        score: faker.number.int({ min: 0, max: 500 }),
        dailyGoal: dailyGoal,
        dailyGoalPreference: dailyGoalPreference,
        lastCourse: 1,
        avatar: faker.number.int({ min: 1, max: 11 })
    };
}


async function main() {

    const usersData = Array.from({ length: 114 }, createRandomUser);

    const users = await prisma.user.createMany({
        data: usersData
    });

    console.log(`Created ${users.length} users`);
    
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });