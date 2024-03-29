import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CandidateModule } from './candidate/candidate.module';
import { PositionModule } from './position/position.module';
import { DepartmentModule } from './department/department.module';
import { InterviewModule } from './interview/interview.module';
import { DocumentsModule } from './documents/documents.module';
import { MulterModule } from '@nestjs/platform-express';
import { NotificationsModule } from './notifications/notifications.module';
import { ApprovalModule } from './approval/approval.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    CandidateModule,
    PositionModule,
    DepartmentModule,
    InterviewModule,
    DocumentsModule,
    MulterModule.register({
      dest: './upload',
    }),
    NotificationsModule,
    ApprovalModule,
  ],
})
export class AppModule {}
