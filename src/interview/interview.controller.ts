import { Interview } from '.prisma/client';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
  constructor(private service: InterviewService) {}

  @Post()
  async createInterviews(@Body() dto: CreateInterviewDto): Promise<Interview> {
    return this.service.createInterviews(dto);
  }
}
