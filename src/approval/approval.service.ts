import { Injectable } from '@nestjs/common';
import { Approval } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApprovalDTO, UpdateApprovalDTO } from './dto';

@Injectable()
export class ApprovalService {
  constructor(private prisma: PrismaService) {}

  async createMany(many: CreateApprovalDTO[]): Promise<Approval[]> {
    return Promise.all(
      many.map((data) =>
        this.prisma.approval.create({
          data: {
            status: data.status,
            department: {
              connect: {
                id: data.departmentId,
              },
            },
            master: data.masterId
              ? {
                  connect: {
                    id: data.masterId,
                  },
                }
              : undefined,
            candidate: {
              connect: {
                id: data.candidateId,
              },
            },
          },
        }),
      ),
    );
  }

  async getOnByCandidateId(candidateId: number) {
    return this.prisma.approval.findMany({
      where: {
        candidateId,
      },
      include: {
        department: true,
        master: {
          include: {
            position: true,
            department: true,
          },
        },
        candidate: {
          include: {
            position: true,
            department: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateApprovalDTO) {
    return this.prisma.approval.update({
      where: { id },
      data: {
        status: data.status,
        master: data.masterId
          ? {
              connect: {
                id: data.masterId,
              },
            }
          : undefined,
        department: data.departmentId
          ? {
              connect: {
                id: data.departmentId,
              },
            }
          : undefined,
      },
    });
  }
}
