import { Position } from '.prisma/client';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreatePositionDto } from './dto/create-position.dto';
import { PositionService } from './position.service';

@Controller('positions')
export class PositionController {
  constructor(private service: PositionService) {}

  @Get()
  getAll(): Promise<Position[]> {
    return this.service.getAll();
  }

  @UseGuards(JwtGuard)
  @Post()
  async createPosition(@Body() dto: CreatePositionDto) {
    // TODO: check role
    return this.service.createPosition(dto);
  }
}
