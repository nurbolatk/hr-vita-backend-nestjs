import type { User, Notifications } from '.prisma/client';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAll(@GetUser() user: User): Promise<Notifications[]> {
    return this.service.getAll(user.id);
  }

  @Put(':id')
  async markRead(@Param() params) {
    const id = parseInt(params.id as string);
    return this.service.markRead(id);
  }
}
