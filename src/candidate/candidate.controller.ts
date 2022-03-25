import { Body, Controller, Post } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto';

@Controller('candidate')
export class CandidateController {
  constructor(private service: CandidateService) {}

  @Post()
  async create(@Body() candidate: CreateCandidateDto) {
    console.log('hi', { candidate });

    return this.service.create(candidate);
  }
}
