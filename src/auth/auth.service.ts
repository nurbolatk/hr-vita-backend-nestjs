import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto, SigninDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponse } from './types';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: SigninDto): Promise<AuthResponse> {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new BadRequestException('Invalid email or password');
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new BadRequestException('Invalid email or password');
    }
    const token = await this.signToken(user.id, user.email);

    delete user.hash;
    return {
      token,
      user,
    };
  }

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const hash: string = await argon.hash(dto.password);
    const user: User = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        hash,
      },
    });

    const token = await this.signToken(user.id, user.email);
    delete user.hash;
    return {
      token,
      user,
    };
  }

  private async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '15d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
