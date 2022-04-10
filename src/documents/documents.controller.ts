import {
  Controller,
  Get,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Response,
  Param,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
import { ReturnDocument } from './types/ReturnDocument.type';

@Controller('documents')
export class DocumentsController {
  constructor(private service: DocumentsService) {}

  @Get(':filepath')
  getFile(
    @Param() { filepath }: { filepath: string },
    @Response({ passthrough: true }) res,
  ): StreamableFile {
    console.log(filepath);

    const file = createReadStream(
      join(process.cwd(), './documents/' + filepath),
    );
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="' + filepath + '"',
    });
    return new StreamableFile(file);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './documents',
      preservePath: true,
      storage: diskStorage({
        destination: './documents',
        filename: function (req, file, callback) {
          console.log(file);

          callback(
            null,
            file.fieldname + '_' + Date.now() + extname(file.originalname),
          );
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string },
  ): Promise<ReturnDocument> {
    const { originalname, size, path, mimetype } = file;

    const newDoc = await this.service.createDocument(
      new CreateDocumentDto(originalname, mimetype, path, size, body.name),
    );
    return {
      ...file,
      id: newDoc.id,
      name: newDoc.name,
    };
  }
}
