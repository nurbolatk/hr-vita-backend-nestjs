import { ApprovalStatus } from '.prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateApprovalDTO {
  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @IsInt()
  @IsOptional()
  masterId?: number;

  @IsInt()
  @IsNotEmpty()
  candidateId: number;

  @IsEnum(ApprovalStatus)
  @IsOptional()
  status?: ApprovalStatus;
}
