import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  async createInterviews(data: CreateInterviewDto) {
    return this.prisma.interview.create({
      data,
    });
  }
}
