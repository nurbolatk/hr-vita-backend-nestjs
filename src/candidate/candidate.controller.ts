import { User } from '.prisma/client';
import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto';

@Controller('candidate')
export class CandidateController {
  constructor(private service: CandidateService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() candidate: CreateCandidateDto, @GetUser() user: User) {
    if (user.departmentId === 1) {
      return this.service.create(candidate);
    }
    throw new ForbiddenException('You are not allowed');
  }
}
