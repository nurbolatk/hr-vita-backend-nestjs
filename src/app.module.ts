import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CandidateController } from './candidate/candidate.controller';
import { CandidateService } from './candidate/candidate.service';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    CandidateModule,
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class AppModule {}
