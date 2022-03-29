import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateInterviewDto {
  @IsInt()
  @IsNotEmpty()
  interviewerId: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  datetime: Date;
}
