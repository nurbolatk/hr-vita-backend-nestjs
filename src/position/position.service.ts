import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.position.findMany();
  }

  async createPosition(dto: CreatePositionDto) {
    return this.prisma.position.create({
      data: dto,
    });
  }
}
