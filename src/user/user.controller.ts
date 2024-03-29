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
    // eslint-disable-next-line prefer-const
    let { username, password, email } = user;
    password = await this.userService.encryptPassword(password);
    console.log(this.userService.decryptPassword(password));
    return this.userService.createUser({ username, password, email });
  }
}
