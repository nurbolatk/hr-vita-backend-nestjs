import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateInterviewDto {
  @IsInt()
  @IsNotEmpty()
  interviewerId: number;

  @IsInt()
  @IsNotEmpty()
  intervieweeId: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  end: Date;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
