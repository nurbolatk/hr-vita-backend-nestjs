import { Candidate } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';
import { UpdateCandidateDTO } from './dto/update-candidate.dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async create(candidate: CreateCandidateDto): Promise<Candidate> {
    try {
      const data = {
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
              date: interview.date,
              location: interview.location,
              name: interview.name,
              start: interview.start,
              end: interview.end,
            };
          }),
        },
        documents: {
          connect:
            candidate.documents === undefined
              ? []
              : candidate.documents.map((id) => ({ id })),
        },
      };

      const newCandidate = await this.prisma.candidate.create({
        data,
        include: {
          position: true,
          department: true,
          interviews: true,
          documents: true,
        },
      });
      return newCandidate;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  async getAll() {
    return this.prisma.candidate.findMany({
      include: {
        position: true,
        department: true,
      },
    });
  }

  async getOneById(id: number) {
    return this.prisma.candidate.findUnique({
      where: { id },
      include: {
        position: true,
        department: true,
        interviews: {
          include: {
            interviewer: true,
            interviewee: true,
          },
        },
        documents: true,
      },
    });
  }

  async update(id: number, body: UpdateCandidateDTO) {
    const { form, interviews, documents } = body;
    console.log({ documents });

    const updates = [];
    let data: any = {};
    if (form) {
      data = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        salary: form.salary,
        location: form.location,
        phone: form.phone,
        position: {
          connectOrCreate: {
            where: {
              name: form.position,
            },
            create: {
              name: form.position,
            },
          },
        },
        department: {
          connectOrCreate: {
            where: {
              name: form.department,
            },
            create: {
              name: form.department,
            },
          },
        },
      };
    }

    if (documents) {
      data.documents = {
        set: documents.map((id) => ({ id })),
      };
    }
    console.log(data);

    const formUpdate = this.prisma.candidate.update({
      where: { id },
      data,
    });
    updates.push(formUpdate);
    if (interviews) {
      const interviewsUpdate = this.prisma.candidate.update({
        where: {
          id,
        },
        data: {
          interviews: {
            deleteMany: {},
            create: (interviews ?? []).map((interview) => {
              return {
                interviewer: {
                  connect: {
                    id: interview.interviewerId,
                  },
                },
                date: interview.date,
                location: interview.location,
                name: interview.name,
                start: interview.start,
                end: interview.end,
              };
            }),
          },
        },
      });
      updates.push(interviewsUpdate);
    }

    const [, candidate] = await Promise.all(updates);
    return candidate;
  }
}
