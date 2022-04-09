import type { User, Notification } from '.prisma/client';
import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAll(@GetUser() user: User): Promise<Notification[]> {
    return this.service.getAll(user.id);
  }

  @Put(':id')
  async markRead(@Param() params) {
    const id = parseInt(params.id as string);
    return this.service.markRead(id);
  }
}
