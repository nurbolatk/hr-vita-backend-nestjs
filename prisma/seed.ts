import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const nurbolat = await prisma.user.upsert({
    where: { email: 'nurbolat.kenzhekulov@gmail.com' },
    update: {},
    create: {
      email: 'nurbolat.kenzhekulov@gmail.com',
      firstName: 'Nurbolat',
      lastName: 'Kenzhekulov',
      position: {
        create: {
          name: 'Senior HR manager',
        },
      },
      department: {
        create: {
          name: 'HR Department',
        },
      },
    },
  });

  console.log({ nurbolat });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
