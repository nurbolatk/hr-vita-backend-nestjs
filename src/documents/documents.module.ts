import { Global, Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Global()
@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
