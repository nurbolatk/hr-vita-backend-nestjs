import { ApprovalStatus } from '.prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
export class CreateOneApprovalDTO {
  @IsString()
  @IsNotEmpty()
  department: string;

  @IsInt()
  @IsOptional()
  masterId?: number;

  @IsInt()
  @IsNotEmpty()
  candidateId: number;
}
