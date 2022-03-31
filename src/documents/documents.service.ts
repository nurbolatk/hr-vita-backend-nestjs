import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/CreateDocument.dto';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async createDocument(data: CreateDocumentDto) {
    return await this.prisma.document.create({
      data,
    });
  }
}
