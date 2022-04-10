import { Approval } from '.prisma/client';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { CreateApprovalDTO, UpdateApprovalDTO } from './dto';

@Controller('approvals')
export class ApprovalController {
  constructor(private service: ApprovalService) {}

  @Post()
  async createMany(@Body() body: CreateApprovalDTO[]): Promise<Approval[]> {
    return this.service.createMany(body);
  }

  @Get('candidate/:candidateId')
  getOnByCandidateId(@Param() params): Promise<Approval[]> {
    const candidateId = parseInt(params.candidateId as string);
    return this.service.getOnByCandidateId(candidateId);
  }

  @Put(':id')
  async update(
    @Param() params,
    @Body() body: UpdateApprovalDTO,
  ): Promise<Approval> {
    const id = parseInt(params.id as string);
    return this.service.update(id, body);
  }
}
