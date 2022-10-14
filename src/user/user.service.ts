import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  getUserInfoById(userId: number): User {
    return {
      firstName: 'John',
      lastName: 'Doe',
      userId: userId,
    };
  }
}
