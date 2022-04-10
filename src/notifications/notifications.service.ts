import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDTO } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createNotification(data: CreateNotificationDTO) {
    const { receiverId, linkAction, ...rest } = data;
    return this.prisma.notification.create({
      data: {
        ...rest,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        linkAction: linkAction
          ? {
              create: linkAction,
            }
          : undefined,
      },
      include: {
        linkAction: true,
      },
    });
  }

  async getAll(userId: number) {
    return this.prisma.notification.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        linkAction: true,
      },
      orderBy: [
        {
          unread: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  }

  async markRead(id: number) {
    return this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        unread: false,
      },
    });
  }
}
