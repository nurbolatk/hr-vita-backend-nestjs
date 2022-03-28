import { Candidate } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async create(candidate: CreateCandidateDto): Promise<Candidate> {
    try {
      const [position, department] = await Promise.all([
        await this.prisma.position.findFirst({
          where: {
            name: {
              equals: candidate.position,
            },
          },
        }),
        await this.prisma.department.findFirst({
          where: {
            name: {
              equals: candidate.department,
            },
          },
        }),
      ]);

      const newCandidate = await this.prisma.candidate.create({
        data: {
          ...candidate,
          position:
            position !== null
              ? {
                  connect: {
                    id: position.id,
                  },
                }
              : {
                  create: {
                    name: candidate.position,
                  },
                },
          department:
            department === null
              ? {
                  create: {
                    name: candidate.department,
                  },
                }
              : {
                  connect: {
                    id: department.id,
                  },
                },
        },
        include: {
          position: true,
          department: true,
        },
      });
      return newCandidate;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }
}
