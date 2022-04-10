import { Module } from '@nestjs/common';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ApprovalController } from './approval.controller';
import { ApprovalService } from './approval.service';

@Module({
  controllers: [ApprovalController],
  providers: [ApprovalService],
  exports: [ApprovalService],
  imports: [NotificationsModule],
})
export class ApprovalModule {}
