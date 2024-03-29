import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as nodemailer from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const transporter = nodemailer.createTransport({
      service: ' outlook',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    
    const mailOptions = {
      from: process.env.MAIL,
      to: data.email,
      subject: `Welcome to our platform, ${data.username}!`,
      html: `<h1>API Login</h1> <p>Welcome to our platform ${data.username}, we are very happy to have you with us.</p> </br> <p>If you were not the one who registered on our website, please contact us by email at raijoiamv@gmail.com</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 

    return this.prisma.user.create({
      data,
    });
  }

  async login(data: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: data,
    });
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = process.env.SALT_ROUNDS;

    return bcrypt.hash(password, parseInt(saltRounds));
  }

  async comparetor(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
