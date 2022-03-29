import { Candidate } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async create(candidate: CreateCandidateDto): Promise<Candidate> {
    try {
      const newCandidate = await this.prisma.candidate.create({
        data: {
          ...candidate,
          position: {
            connectOrCreate: {
              where: {
                name: candidate.position,
              },
              create: {
                name: candidate.position,
              },
            },
          },
          department: {
            connectOrCreate: {
              where: {
                name: candidate.department,
              },
              create: {
                name: candidate.department,
              },
            },
          },
          interviews: {
            create: (candidate.interviews ?? []).map((interview) => {
              return {
                interviewer: {
                  connect: {
                    id: interview.interviewerId,
                  },
                },
                datetime: interview.datetime,
                location: 'Almaty',
              };
            }),
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
