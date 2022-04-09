import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateInterviewDto } from 'src/interview/dto/create-interview.dto';

export class UpdateCandidateFormDTO {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsOptional()
  salary?: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsInt()
  @IsOptional()
  documentId?: number;
}

export class UpdateCandidateDTO {
  @ValidateNested()
  @Type(() => UpdateCandidateFormDTO)
  @IsOptional()
  form?: UpdateCandidateFormDTO;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateInterviewDto)
  @IsOptional()
  interviews?: CreateInterviewDto[];
}
