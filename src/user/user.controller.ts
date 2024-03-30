import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  async login(@Body() user: { email: string; password: string }) {
    return await this.userService.login({ ...user });
  }

  @Post('register')
  async registerUser(
    @Body() user: { username: string; password: string; email: string },
  ): Promise<User> {
    return this.userService.createUser({ ...user });
  }
}
