import { Injectable } from '@nestjs/common';
import { Approval } from '@prisma/client';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApprovalDTO, UpdateApprovalDTO } from './dto';

@Injectable()
export class ApprovalService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async createMany(many: CreateApprovalDTO[]): Promise<Approval[]> {
    return Promise.all(
      many.map(async (data) => {
        const approval = await this.prisma.approval.create({
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
          include: {
            candidate: {
              include: {
                position: true,
              },
            },
          },
        });
        if (data.masterId) {
          this.notificationsService.createNotification({
            title:
              'Вам нужно согласовать введение в должность нового сотрудника',
            content: `
          Вам нужно согласовать введение в должность нового сотрудника ${approval.candidate.firstName} ${approval.candidate.lastName} на позицию ${approval.candidate.position.name}.
      `,
            receiverId: data.masterId,
            linkAction: {
              to: `/approvals/${approval.id}`,
              label: 'More',
            },
          });
        }
        return approval;
      }),
    );
  }

  async getOneByCandidateId(candidateId: number) {
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

  async getOneById(id: number) {
    return this.prisma.approval.findUnique({
      where: {
        id,
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
    const approval = await this.prisma.approval.update({
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
      include: {
        candidate: {
          include: {
            position: true,
          },
        },
      },
    });
    if (data.masterId) {
      this.notificationsService.createNotification({
        title: 'Вам нужно согласовать введение в должность нового сотрудника',
        content: `
      Вам нужно согласовать введение в должность нового сотрудника ${approval.candidate.firstName} ${approval.candidate.lastName} на позицию ${approval.candidate.position.name}.
  `,
        receiverId: data.masterId,
        linkAction: {
          to: `/approvals/${approval.id}`,
          label: 'More',
        },
      });
    }
    return approval;
  }
}
