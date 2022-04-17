import { IsOptional, IsString } from 'class-validator';

export class UpdateMeDTO {
  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
