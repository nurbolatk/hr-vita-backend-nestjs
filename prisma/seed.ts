import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as argon from 'argon2';

async function departments() {
  await prisma.department.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'HR отдел',
    },
  });
  await prisma.department.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Руководство',
    },
  });
  await prisma.department.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Отдел веб разработки',
    },
  });
  await prisma.department.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Отдел мобильной разработки',
    },
  });
  await prisma.department.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Отдел СБ',
    },
  });
}

async function positions() {
  await prisma.position.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'HR Директор',
    },
  });
  await prisma.position.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'HR',
    },
  });
  await prisma.position.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Старший веб разработчик',
    },
  });
  await prisma.position.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Веб разработчик',
    },
  });
  await prisma.position.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Старший Android разработчик',
    },
  });
  await prisma.position.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: 'Android разработчик',
    },
  });
  await prisma.position.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: 'Начальник СБ',
    },
  });
  await prisma.position.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: 'Генеральный директор',
    },
  });
}

async function employees() {
  const hash = await argon.hash('asdfasdf');

  await prisma.user.upsert({
    where: { email: 'abylay@gmail.com' },
    update: {},
    create: {
      email: 'abylay@gmail.com',
      firstName: 'Абылай',
      lastName: 'Абкенов',
      hash,
      salary: 500000,
      status: 'WORKING',

      position: {
        connect: {
          id: 8,
        },
      },
      department: {
        connect: {
          id: 2,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'dota.aibek.dota@gmail.com' },
    update: {},
    create: {
      email: 'dota.aibek.dota@gmail.com',
      firstName: 'Айбек',
      lastName: 'Альжан',
      hash,
      salary: 500000,
      status: 'WORKING',
      supervisor: {
        connect: {
          email: 'abylay@gmail.com',
        },
      },
      position: {
        connect: {
          id: 1,
        },
      },
      department: {
        connect: {
          id: 1,
        },
      },
      role: 'HR',
    },
  });

  await prisma.user.upsert({
    where: { email: 'nurbolat.kenzhekulov@gmail.com' },
    update: {},
    create: {
      email: 'nurbolat.kenzhekulov@gmail.com',
      firstName: 'Алмас',
      lastName: 'Максатов',
      hash,
      salary: 500000,
      status: 'WORKING',
      supervisor: {
        connect: {
          email: 'dota.aibek.dota@gmail.com',
        },
      },
      position: {
        connect: {
          id: 2,
        },
      },
      department: {
        connect: {
          id: 1,
        },
      },
      role: 'HR',
    },
  });

  await prisma.user.upsert({
    where: { email: 'daulet@gmail.com' },
    update: {},
    create: {
      email: 'daulet@gmail.com',
      firstName: 'Даулет',
      lastName: 'Дауренов',
      hash,
      salary: 500000,
      status: 'WORKING',
      supervisor: {
        connect: {
          email: 'abylay@gmail.com',
        },
      },
      position: {
        connect: {
          id: 3,
        },
      },
      department: {
        connect: {
          id: 3,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'zhandos@gmail.com' },
    update: {},
    create: {
      email: 'zhandos@gmail.com',
      firstName: 'Жандос',
      lastName: 'Жексенов',
      hash,
      salary: 500000,
      status: 'WORKING',
      supervisor: {
        connect: {
          email: 'abylay@gmail.com',
        },
      },
      position: {
        connect: {
          id: 5,
        },
      },
      department: {
        connect: {
          id: 4,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'toregali@gmail.com' },
    update: {},
    create: {
      email: 'toregali@gmail.com',
      firstName: 'Торегали',
      lastName: 'Тореали',
      hash,
      salary: 500000,
      status: 'WORKING',
      supervisor: {
        connect: {
          email: 'abylay@gmail.com',
        },
      },
      position: {
        connect: {
          id: 7,
        },
      },
      department: {
        connect: {
          id: 5,
        },
      },
    },
  });
}

async function candidates() {
  await prisma.candidate.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Нуржан',
      lastName: 'Адилбек',
      email: 'nurzhan@gmail.com',
      position: {
        connect: {
          id: 2,
        },
      },
      department: {
        connect: {
          id: 1,
        },
      },
      salary: 300000,
    },
  });
  await prisma.candidate.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: 'Айдана',
      lastName: 'Малик',
      email: 'aidana@gmail.com',
      position: {
        connect: {
          id: 4,
        },
      },
      department: {
        connect: {
          id: 3,
        },
      },
      salary: 300000,
    },
  });
}

async function interviews() {
  await prisma.interview.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      location: 'Almaty office, 440 room',
      interviewee: {
        connect: {
          id: 2,
        },
      },
      interviewer: {
        connect: {
          email: 'daulet@gmail.com',
        },
      },
      date: new Date(),
      start: new Date(),
      end: new Date(),
      name: 'First HR interview',
    },
  });
}

async function documents() {
  await prisma.document.upsert({
    where: { id: 1 },
    update: {},
    create: {
      originalname: 'pexels-photo-2379004.jpeg',
      name: 'Фото',
      mimetype: 'image/jpeg',
      path: 'documents/file_1649647917574.jpeg',
      size: 53849,
      candidate: {
        connect: {
          id: 2,
        },
      },
    },
  });
}

async function main() {
  await departments();
  await positions();
  await employees();
  await candidates();
  await interviews();
  await documents();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
