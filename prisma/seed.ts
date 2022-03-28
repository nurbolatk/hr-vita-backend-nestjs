import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as argon from 'argon2';

async function main() {
  const hash = await argon.hash('asdfasdf');
  const nurbolat = await prisma.user.upsert({
    where: { email: 'nurbolat.kenzhekulov@gmail.com' },
    update: {},
    create: {
      email: 'nurbolat.kenzhekulov@gmail.com',
      firstName: 'Nurbolat',
      lastName: 'Kenzhekulov',
      hash,
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
