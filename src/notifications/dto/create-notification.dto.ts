import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateLinkActionDTO {
  @IsInt()
  @IsOptional()
  notificationId?: number;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}

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

  @ValidateNested()
  @Type(() => CreateLinkActionDTO)
  @IsOptional()
  linkAction?: CreateLinkActionDTO;
}
