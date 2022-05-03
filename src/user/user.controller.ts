import { User } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { UpdateMeDTO } from './dto/update-me-dto';
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
  @Put('me')
  updateMe(@GetUser() user: User, @Body() body: UpdateMeDTO) {
    return this.userService.updateMe(user.id, body);
  }

  @Get('search')
  search(@Query('query') query: string): Promise<User[]> {
    return this.userService.searchUser(query);
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

  @Post('change-password')
  setPassword(@Body() dto: SetPasswordDto): Promise<User> {
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
