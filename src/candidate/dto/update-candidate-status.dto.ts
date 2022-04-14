import { CandidateStatus } from '.prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateCandidateStatusDTO {
  @IsEnum(CandidateStatus)
  @IsNotEmpty()
  status: CandidateStatus;
}
