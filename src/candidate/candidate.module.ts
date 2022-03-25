import { Module } from '@nestjs/common';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';

@Module({
  providers: [CandidateService],
  controllers: [CandidateController],
})
export class CandidateModule {}
