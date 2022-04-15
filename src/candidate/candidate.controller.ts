import { Candidate, User } from '.prisma/client';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto';
import { UpdateCandidateStatusDTO } from './dto/update-candidate-status.dto';
import { UpdateCandidateDTO } from './dto/update-candidate.dto';

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

  @Get()
  async getAll(): Promise<Candidate[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getOneById(@Param() params): Promise<Candidate> {
    const id = parseInt(params.id as string);
    if (isNaN(id)) {
      throw new NotFoundException(
        'Could not find a candidate with id ' + params.id,
      );
    }
    return this.service.getOneById(id);
  }

  @Put(':id')
  async update(
    @Param() params,
    @Body() data: UpdateCandidateDTO,
  ): Promise<Candidate> {
    const id = parseInt(params.id as string);
    if (isNaN(id)) {
      throw new NotFoundException(
        'Could not find a candidate with id ' + params.id,
      );
    }
    return this.service.update(id, data);
  }

  @Put(':id/status')
  async updateStatus(@Param() params, @Body() data: UpdateCandidateStatusDTO) {
    const id = parseInt(params.id as string);
    if (isNaN(id)) {
      throw new NotFoundException(
        'Could not find a candidate with id ' + params.id,
      );
    }
    return this.service.updateStatus(id, data);
  }
}
