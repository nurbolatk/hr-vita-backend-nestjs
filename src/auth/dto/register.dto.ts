import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ValidateNested()
  @Type(() => CreatePositionDto)
  position: CreatePositionDto;

  @ValidateNested()
  @Type(() => CreateDepartmentDto)
  department: CreateDepartmentDto;
}
