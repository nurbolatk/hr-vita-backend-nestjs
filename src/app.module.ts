import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CandidateModule } from './candidate/candidate.module';
import { PositionModule } from './position/position.module';
import { DepartmentModule } from './department/department.module';
import { InterviewModule } from './interview/interview.module';

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
  ],
})
export class AppModule {}
