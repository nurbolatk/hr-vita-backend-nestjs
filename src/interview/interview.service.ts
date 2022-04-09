import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  async createInterviews(data: CreateInterviewDto) {
    return this.prisma.interview.create({
      data,
    });
  }

  async getAll(intervieweeId: number) {
    return this.prisma.interview.findMany({
      where: {
        intervieweeId,
      },
      orderBy: [
        {
          date: 'asc',
        },
        {
          start: 'asc',
        },
      ],
      include: {
        interviewee: true,
        interviewer: true,
      },
    });
  }

  async update(id: number, data: CreateInterviewDto) {
    return this.prisma.interview.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.interview.delete({
      where: { id },
    });
  }
}
