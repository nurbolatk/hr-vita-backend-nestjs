import { Candidate, CandidateStatus } from '.prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';
import { UpdateCandidateStatusDTO } from './dto/update-candidate-status.dto';
import { UpdateCandidateDTO } from './dto/update-candidate.dto';

import * as argon from 'argon2';
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
          documents: {
            select: {
              id: true,
              name: true,
              originalname: true,
              mimetype: true,
              path: true,
              size: true,
            },
          },
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
        interviews: {
          include: {
            interviewer: true,
            interviewee: true,
          },
        },
        documents: {
          select: {
            id: true,
            name: true,
            originalname: true,
            mimetype: true,
            path: true,
            size: true,
          },
        },
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
        documents: {
          select: {
            id: true,
            name: true,
            originalname: true,
            mimetype: true,
            path: true,
            size: true,
          },
        },
      },
    });
  }

  async update(id: number, body: UpdateCandidateDTO) {
    const { form, interviews, documents } = body;

    const updates: Promise<Candidate>[] = [];
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

    const formUpdate: Promise<Candidate> = this.prisma.candidate.update({
      where: { id },
      data,
      include: {
        position: true,
        department: true,
        interviews: {
          include: {
            interviewer: true,
            interviewee: true,
          },
        },
        documents: {
          select: {
            id: true,
            name: true,
            originalname: true,
            mimetype: true,
            path: true,
            size: true,
          },
        },
      },
    });
    updates.push(formUpdate);
    if (interviews) {
      const interviewsUpdate: Promise<Candidate> = this.prisma.candidate.update(
        {
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
          include: {
            position: true,
            department: true,
            interviews: {
              include: {
                interviewer: true,
                interviewee: true,
              },
            },
            documents: {
              select: {
                id: true,
                name: true,
                originalname: true,
                mimetype: true,
                path: true,
                size: true,
              },
            },
          },
        },
      );
      updates.push(interviewsUpdate);
    }

    const results = await Promise.all(updates);

    return results.length === 2 ? results[1] : results[0];
  }

  async updateStatus(id: number, data: UpdateCandidateStatusDTO) {
    const updated = await this.prisma.candidate.update({
      where: { id },
      data,
      include: {
        department: true,
        position: true,
        documents: {
          select: {
            id: true,
            name: true,
            originalname: true,
            mimetype: true,
            path: true,
            size: true,
          },
        },
      },
    });

    if (data.status === CandidateStatus.HIRED) {
      const hash = await argon.hash('asdfasdf');
      await this.prisma.user.create({
        data: {
          email: updated.email,
          hash,
          firstName: updated.firstName,
          lastName: updated.lastName,
          location: updated.location,
          salary: updated.salary ?? 0,
          phone: updated.phone,
          position: {
            connectOrCreate: {
              where: {
                name: updated.position.name,
              },
              create: {
                name: updated.position.name,
              },
            },
          },
          department: {
            connectOrCreate: {
              where: {
                name: updated.department.name,
              },
              create: {
                name: updated.department.name,
              },
            },
          },
          documents: {
            connect: updated.documents.map((doc) => ({ id: doc.id })),
          },
        },
      });
    }

    return updated;
  }
}
