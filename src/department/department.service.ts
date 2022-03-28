import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/createDepartment.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}
  getAll() {
    return this.prisma.department.findMany();
  }

  create(dto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: dto,
    });
  }
}
