import { Role, UserStatus } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { ApprovalService } from 'src/approval/approval.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { UpdateMeDTO } from './dto/update-me-dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private approvalService: ApprovalService,
  ) {}

  async setPassword(dto: SetPasswordDto) {
    const hash = await argon.hash(dto.password);
    const updated = await this.prisma.user.update({
      where: {
        email: dto.email,
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
        myApprovals: true,
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
        myApprovals: true,
      },
    });
  }

  async createUser(data: CreateUserDTO) {
    const parsed = await this.parseData(data);
    const user = await this.prisma.user.create({
      data: parsed,
      include: {
        supervisor: {
          include: {
            department: true,
          },
        },
        documents: true,
      },
    });
    if (user.status === UserStatus.NOT_ACCEPTED) {
      this.approvalService.createMany([
        {
          departmentId: 5,
          candidateId: user.id,
        },
        {
          departmentId: user.supervisor.departmentId,
          masterId: user.supervisor.id,
          candidateId: user.id,
        },
        {
          departmentId: 2,
          masterId: 1,
          candidateId: user.id,
        },
        {
          departmentId: 1,
          candidateId: user.id,
        },
      ]);
    }
    return user;
  }

  private async parseData(data: CreateUserDTO) {
    const { position, department, supervisorId, documents, ...rest } = data;
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
      documents: documents
        ? {
            connect: documents.map((id) => ({ id })),
          }
        : [],
    };
  }

  async updateUser(id: number, data: CreateUserDTO) {
    const { position, department, supervisorId, documents, ...rest } = data;
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
          set: documents.map((id) => ({ id })),
        },
      },
      include: {
        position: true,
        department: true,
        supervisor: {
          include: {
            department: true,
          },
        },
        documents: true,
      },
    });
  }

  async searchUser(query: string) {
    const res = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
          // {
          //   position: {
          //     name: {
          //       contains: query,
          //     },
          //   },
          // },
        ],
      },
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
        myApprovals: true,
      },
    });

    return res;
  }

  async updateMe(id: number, data: UpdateMeDTO) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
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
        myApprovals: true,
      },
    });
  }
}
