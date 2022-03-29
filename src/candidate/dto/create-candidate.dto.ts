import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateDepartmentDto } from 'src/department/dto/createDepartment.dto';
import { CreateInterviewDto } from 'src/interview/dto/create-interview.dto';
import { CreatePositionDto } from 'src/position/dto/create-position.dto';

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

  // @ValidateNested()
  // @Type(() => CreatePositionDto)
  @IsString()
  @IsNotEmpty()
  position: string;

  // @ValidateNested()
  // @Type(() => CreateDepartmentDto)
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
}
