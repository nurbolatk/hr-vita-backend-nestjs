export type ReturnDocument = {
  id: number;
  name: string;
} & Express.Multer.File;
