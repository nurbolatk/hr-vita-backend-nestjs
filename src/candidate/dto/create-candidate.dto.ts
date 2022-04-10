import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateInterviewDto } from 'src/interview/dto/create-interview.dto';

export class CreateCandidateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsInt()
  @IsOptional()
  salary?: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateInterviewDto)
  @IsOptional()
  interviews?: CreateInterviewDto[];

  @IsArray()
  @IsOptional()
  documents?: number[];
}
