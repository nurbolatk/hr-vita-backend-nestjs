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

@Controller('documents')
export class DocumentsController {
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
  uploadFile(@UploadedFile() file: Express.Multer.File): Express.Multer.File {
    return file;
  }
}
