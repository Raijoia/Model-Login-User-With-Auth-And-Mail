import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá, bem vindo a API de cadastro de usuários com auth e emailsender!';
  }
}
