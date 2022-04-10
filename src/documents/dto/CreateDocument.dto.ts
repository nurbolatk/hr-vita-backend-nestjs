import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  constructor(
    originalname: string,
    mimetype: string,
    path: string,
    size: number,
    name: string,
  ) {
    this.originalname = originalname;
    this.mimetype = mimetype;
    this.path = path;
    this.size = size;
    this.name = name;
  }

  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  name: string;

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
