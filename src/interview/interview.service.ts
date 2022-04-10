import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { displayDay, displayTime } from 'src/utils';
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
      Вы назначены в качестве интвервьюера нового кандидата ${
        interview.interviewee.firstName
      } ${interview.interviewee.lastName} на позицию ${
        interview.interviewee.position.name
      }. Интервью пройдет в ${interview.location} ${displayDay(
        interview.date,
      )} с ${displayTime(interview.start)} до ${displayTime(interview.end)}
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
    const old = await this.prisma.interview.findUnique({
      where: {
        id,
      },
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
    const updated = await this.prisma.interview.update({
      where: { id },
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
    console.log({ old, updated });

    if (updated.interviewerId !== old.interviewerId) {
      // send 2 notifs
      console.log('a');
      this.notificationsService.createNotification({
        title: 'Вы сняты с проведения интервью',
        content: `
        Интервью нового кандидата ${updated.interviewee.firstName} ${
          updated.interviewee.lastName
        } на позицию ${updated.interviewee.position.name}, который пройдет в ${
          updated.location
        } ${displayDay(updated.date)} с ${displayTime(
          updated.start,
        )} до ${displayTime(updated.end)} проведет другой сотрудник.
        `,
        receiverId: old.interviewerId,
      });
      this.notificationsService.createNotification({
        title: 'Вы будете проводить интервью!',
        content: `
        Вы назначены в качестве интвервьюера нового кандидата ${
          updated.interviewee.firstName
        } ${updated.interviewee.lastName} на позицию ${
          updated.interviewee.position.name
        }. Интервью пройдет в ${updated.location} ${displayDay(
          updated.date,
        )} с ${displayTime(updated.start)} до ${displayTime(updated.end)}
        `,
        receiverId: updated.interviewerId,
        linkAction: {
          to: `/interviews/${updated.id}`,
          label: 'More',
        },
      });
    } else {
      console.log('b');
      this.notificationsService.createNotification({
        title: 'Детали интервью изменены',
        content: `
        Интервью с ${updated.interviewee.firstName} ${
          updated.interviewee.lastName
        } теперь пройдет в ${updated.location} ${displayDay(
          updated.date,
        )} с ${displayTime(updated.start)} до ${displayTime(updated.end)}
        `,
        receiverId: updated.interviewerId,
        linkAction: {
          to: `/interviews/${updated.id}`,
          label: 'More',
        },
      });
    }
    return updated;
  }

  async delete(id: number) {
    return this.prisma.interview.delete({
      where: { id },
    });
  }
}
