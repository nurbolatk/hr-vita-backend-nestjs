import { User } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateUserDTO } from './dto/create-user.dto';
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

  @Get(':id')
  getOneByid(@Param() params) {
    const id = parseInt(params.id as string);
    return this.userService.getOneByid(id);
  }

  @Post()
  createUser(@Body() data: CreateUserDTO) {
    return this.userService.createUser(data);
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

  @Put(':id')
  updateUser(@Param() params, @Body() body: CreateUserDTO) {
    const id = parseInt(params.id as string);
    return this.userService.updateUser(id, body);
  }
}
