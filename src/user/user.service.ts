import { Role } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async setPassword(dto: SetPasswordDto) {
    const hash = await argon.hash(dto.password);
    const updated = await this.prisma.user.update({
      where: {
        id: dto.userId,
      },
      data: {
        hash,
      },
    });
    return updated;
  }

  async getAll() {
    return await this.prisma.user.findMany({
      include: {
        position: true,
        department: true,
        supervisor: {
          include: {
            position: true,
            department: true,
          },
        },
        documents: true,
        interviews: true,
      },
    });
  }

  async getOneByid(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        position: true,
        department: true,
        supervisor: {
          include: {
            position: true,
            department: true,
          },
        },
        documents: true,
        interviews: true,
      },
    });
  }

  async createUser(data: CreateUserDTO) {
    const parsed = await this.parseData(data);
    return this.prisma.user.create({
      data: parsed,
    });
  }

  private async parseData(data: CreateUserDTO) {
    const { position, department, supervisorId, documentId, ...rest } = data;
    const hash = await argon.hash('asdfasdf');
    const role = position.toLowerCase().includes('hr') ? Role.HR : Role.USER;
    return {
      ...rest,
      role,
      hash,
      position: {
        connectOrCreate: {
          where: {
            name: position,
          },
          create: {
            name: position,
          },
        },
      },
      department: {
        connectOrCreate: {
          where: {
            name: department,
          },
          create: {
            name: department,
          },
        },
      },
      supervisor: {
        connect: {
          id: supervisorId,
        },
      },
      documents: {
        connect:
          documentId === null
            ? []
            : [
                {
                  id: documentId ?? undefined,
                },
              ],
      },
    };
  }

  async updateUser(id: number, data: CreateUserDTO) {
    const { position, department, supervisorId, documentId, ...rest } = data;
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...rest,
        position: {
          connectOrCreate: {
            where: {
              name: position,
            },
            create: {
              name: position,
            },
          },
        },
        department: {
          connectOrCreate: {
            where: {
              name: department,
            },
            create: {
              name: department,
            },
          },
        },
        supervisor: {
          connect: {
            id: supervisorId,
          },
        },
        documents: {
          connect:
            documentId === null
              ? []
              : [
                  {
                    id: documentId ?? undefined,
                  },
                ],
        },
      },
    });
  }
}
