import { Department } from '.prisma/client';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/createDepartment.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private service: DepartmentService) {}

  @Get()
  getAll(): Promise<Department[]> {
    return this.service.getAll();
  }

  @UseGuards(JwtGuard)
  @Post()
  createPosition(@Body() dto: CreateDepartmentDto) {
    // TODO: check role
    return this.service.create(dto);
  }
}
