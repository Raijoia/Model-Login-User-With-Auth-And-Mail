import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  async login (@Body() user: { email: string; password: string }) {
    // eslint-disable-next-line prefer-const
    let { email, password } = user;

    const userLogin = await this.userService.login({ email });
    
    if (!userLogin) {
      return { message: 'User not found' };
    }

    if (userLogin) {
      const isPasswordMatch = await this.userService.comparetor(password, userLogin.password);

      if (isPasswordMatch) {
        return userLogin;
      } else {
        return { message: 'Password is incorrect' };
      }
    }
  }

  @Post('register')
  async registerUser(
    @Body() user: { username: string; password: string; email: string },
  ): Promise<User> {
    // eslint-disable-next-line prefer-const
    let { username, password, email } = user;

    password = await this.userService.encryptPassword(password);

    return this.userService.createUser({ username, password, email });
  }
}
