import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ApprovalModule } from 'src/approval/approval.module';

@Module({
  imports: [ApprovalModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
