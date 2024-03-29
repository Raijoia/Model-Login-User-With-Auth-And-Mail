import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = process.env.SALT_ROUNDS;

    return bcrypt.hash(password, parseInt(saltRounds));
  }

  async comparetor(password:string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
