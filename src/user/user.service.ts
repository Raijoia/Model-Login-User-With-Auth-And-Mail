import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  key = crypto.randomBytes(Number(process.env.CRYPTO_BYTES));
  iv = crypto.randomBytes(Number(process.env.CRYPTO_BYTES2));

  async encryptPassword(password: string): Promise<string> {
    const algorith = process.env.ALGORITHM;

    const cipher = crypto.createCipheriv(algorith, this.key, this.iv);
    const encrypted = cipher.update(password, 'utf-8', 'hex') + cipher.final('hex');

    console.log('Encrypted:', encrypted);

    return encrypted.toString();
  }

  async decryptPassword(password: string): Promise<string> {
    const algorith = process.env.ALGORITHM;

    const decipher = crypto.createDecipheriv(algorith, this.key, this.iv);
    const decrypted = decipher.update(password, 'hex', 'utf-8') + decipher.final('utf-8');

    console.log('Decrypted:', decrypted.toString());

    return decrypted.toString();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
