import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signin(dto: AuthDto) {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new BadRequestException('Invalid email or password');
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Invalid email or password');
    }
    delete user.hash;
    return user;
  }

  async signup(dto: AuthDto): Promise<Omit<User, 'hash'>> {
    const hash: string = await argon.hash(dto.password);
    const user: User = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    delete user.hash;
    return user;
  }
}
