import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  receiverId: number;
}
