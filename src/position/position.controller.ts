import { Position } from '.prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreatePositionDto } from './dto/create-position.dto';
import { PositionService } from './position.service';

function delay() {
  console.log('a');

  return new Promise(() =>
    setTimeout(() => {
      console.log('b');
    }, 1333),
  );
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

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
    sleep(1000);
    throw new BadRequestException('AAAA');
  }
}
