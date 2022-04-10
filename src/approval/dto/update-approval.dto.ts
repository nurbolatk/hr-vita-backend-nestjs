import { ApprovalStatus } from '.prisma/client';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdateApprovalDTO {
  @IsInt()
  @IsOptional()
  departmentId?: number;

  @IsInt()
  @IsOptional()
  masterId?: number;

  @IsEnum(ApprovalStatus)
  @IsOptional()
  status?: ApprovalStatus;
}
