import { Approval } from '.prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApprovalService } from './approval.service';
import {
  CreateApprovalDTO,
  CreateOneApprovalDTO,
  UpdateApprovalDTO,
} from './dto';

@Controller('approvals')
export class ApprovalController {
  constructor(private service: ApprovalService) {}

  @Post()
  async createMany(@Body() body: CreateApprovalDTO[]): Promise<Approval[]> {
    return this.service.createMany(body);
  }

  @Post('one')
  async create(@Body() body: CreateOneApprovalDTO): Promise<Approval> {
    return this.service.createOne(body);
  }

  @Get('candidate/:candidateId')
  getOnByCandidateId(@Param() params): Promise<Approval[]> {
    const candidateId = parseInt(params.candidateId as string);
    return this.service.getOneByCandidateId(candidateId);
  }

  @Put(':id')
  async update(
    @Param() params,
    @Body() body: UpdateApprovalDTO,
  ): Promise<Approval> {
    const id = parseInt(params.id as string);
    return this.service.update(id, body);
  }

  @Get(':id')
  async getOneById(@Param() params): Promise<Approval> {
    const id = parseInt(params.id as string);
    return this.service.getOneById(id);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<Approval> {
    const id = parseInt(params.id as string);
    return this.service.delete(id);
  }
}
