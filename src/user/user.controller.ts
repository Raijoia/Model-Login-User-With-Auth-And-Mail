import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() user: { username: string; password: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(user);
  }
}
