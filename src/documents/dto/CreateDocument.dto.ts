import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  constructor(
    originalname: string,
    mimetype: string,
    path: string,
    size: number,
  ) {
    this.originalname = originalname;
    this.mimetype = mimetype;
    this.path = path;
    this.size = size;
  }

  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsInt()
  @IsNotEmpty()
  size: number;
}
