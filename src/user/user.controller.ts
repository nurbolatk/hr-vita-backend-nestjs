import { User } from '.prisma/client';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { SetPasswordDto } from './dto/set-password.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Post('change-password')
  setPassword(
    @Body() dto: SetPasswordDto,
    @GetUser() user: User,
  ): Promise<User> {
    console.log({
      dto,
      user,
    });
    // TODO: check if user has permissions
    return this.userService.setPassword(dto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
