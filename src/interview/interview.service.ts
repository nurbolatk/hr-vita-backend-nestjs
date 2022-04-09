import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async createInterviews(data: CreateInterviewDto) {
    const interview = await this.prisma.interview.create({
      data,
      include: {
        interviewee: {
          include: {
            position: true,
          },
        },
        interviewer: {
          include: {
            position: true,
          },
        },
      },
    });
    this.notificationsService.createNotification({
      title: 'Вы будете проводить интервью!',
      content: `
      Вы назначены в качестве интвервьюера нового кандидата ${interview.interviewee.firstName} ${interview.interviewee.lastName} на позицию ${interview.interviewee.position.name}. Интервью пройдет в ${interview.location} в ${interview.date} с ${interview.start} до ${interview.end}
      `,
      receiverId: data.interviewerId,
      linkAction: {
        to: `/interviews/${interview.id}`,
        label: 'More',
      },
    });
    return interview;
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
        interviewee: {
          include: {
            position: true,
          },
        },
        interviewer: {
          include: {
            position: true,
          },
        },
      },
    });
  }

  async getOneById(id: number) {
    return this.prisma.interview.findUnique({
      where: { id },
      include: {
        interviewee: {
          include: {
            position: true,
          },
        },
        interviewer: {
          include: {
            position: true,
          },
        },
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
