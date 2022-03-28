import { IsInt, IsString, MinLength } from 'class-validator';

export class SetPasswordDto {
  @IsString()
  @MinLength(3)
  password: string;

  @IsInt()
  userId: number;
}
