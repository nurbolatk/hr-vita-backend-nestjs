import {
  Controller,
  Get,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Response,
  Param,
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

    const file = createReadStream(join(process.cwd(), './uploads/' + filepath));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="' + filepath + '"',
    });
    return new StreamableFile(file);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
      preservePath: true,
      storage: diskStorage({
        destination: './uploads',
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
  ): Promise<ReturnDocument> {
    const { originalname, size, path, mimetype } = file;
    const newDoc = await this.service.createDocument(
      new CreateDocumentDto(originalname, mimetype, path, size),
    );
    return {
      ...file,
      id: newDoc.id,
    };
  }
}
