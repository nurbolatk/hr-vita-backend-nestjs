import { Injectable } from '@nestjs/common';
import { Approval } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApprovalDTO } from './dto';

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
            master: {
              connect: {
                id: data.masterId,
              },
            },
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
}
