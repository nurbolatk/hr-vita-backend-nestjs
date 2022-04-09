import { Module } from '@nestjs/common';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService],
  imports: [NotificationsModule],
})
export class InterviewModule {}
