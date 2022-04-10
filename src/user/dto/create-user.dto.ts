import { UserStatus } from '.prisma/client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsInt()
  @IsNotEmpty()
  salary: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsNotEmpty()
  position: string;
  @IsString()
  @IsNotEmpty()
  department: string;

  @IsInt()
  @IsNotEmpty()
  supervisorId: number;

  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;

  @IsArray()
  @IsOptional()
  documents?: number[];
}
