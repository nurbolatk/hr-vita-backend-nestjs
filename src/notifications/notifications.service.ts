import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDTO } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createNotification(data: CreateNotificationDTO) {
    const { receiverId, ...rest } = data;
    return this.prisma.notifications.create({
      data: {
        ...rest,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
      },
    });
  }

  async getAll(userId: number) {
    return this.prisma.notifications.findMany({
      where: {
        receiverId: userId,
      },
    });
  }

  async markRead(id: number) {
    return this.prisma.notifications.update({
      where: {
        id,
      },
      data: {
        unread: false,
      },
    });
  }
}
