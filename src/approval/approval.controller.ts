import { Approval } from '.prisma/client';
import { Body, Controller, Post } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { CreateApprovalDTO } from './dto';

@Controller('approval')
export class ApprovalController {
  constructor(private service: ApprovalService) {}

  @Post()
  async createMany(@Body() body: CreateApprovalDTO[]): Promise<Approval[]> {
    return this.service.createMany(body);
  }
}
