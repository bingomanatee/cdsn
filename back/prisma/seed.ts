import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.process.upsert({
    where: {
      id: 'Github Repository Lucas-Czarnecki/COVID-19-CLEANED-JHUCSSE)',
    },
    update: {},
    create: {
      name: 'Github Repository Lucas-Czarnecki/COVID-19-CLEANED-JHUCSSE)',
      description:
        "Github repo where data files are stored; 'Lucas-Czarnecki'/'COVID-19-CLEANED-JHUCSSE'",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
