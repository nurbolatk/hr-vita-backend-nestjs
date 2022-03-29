import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SetPasswordDto } from './dto/set-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async setPassword(dto: SetPasswordDto) {
    const hash = await argon.hash(dto.password);
    const updated = await this.prisma.user.update({
      where: {
        id: dto.userId,
      },
      data: {
        hash,
      },
    });
    return updated;
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }
}
