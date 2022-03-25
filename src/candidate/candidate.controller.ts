import { Controller, Post } from '@nestjs/common';
import { CandidateService } from './candidate.service';

@Controller('candidate')
export class CandidateController {
  constructor(private service: CandidateService) {}

  @Post()
  create() {
    return this.service.create();
  }
}
