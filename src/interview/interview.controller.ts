import { Interview } from '.prisma/client';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { InterviewService } from './interview.service';

@Controller('interviews')
export class InterviewController {
  constructor(private service: InterviewService) {}

  @Post()
  async createInterviews(@Body() dto: CreateInterviewDto): Promise<Interview> {
    return this.service.createInterviews(dto);
  }

  @Get('interviewee/:intervieweeId')
  async getAll(@Param() params): Promise<Interview[]> {
    const intervieweeId = parseInt(params.intervieweeId as string);
    return this.service.getAll(intervieweeId);
  }

  @Put(':id')
  async update(
    @Param() params,
    @Body() dto: CreateInterviewDto,
  ): Promise<Interview> {
    const id = parseInt(params.id as string);
    return this.service.update(id, dto);
  }
}
