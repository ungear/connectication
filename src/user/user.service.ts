import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserInfo } from './interfaces/user-info.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      password: 'asd',
      username: 'johndoe',
    },
    {
      userId: 2,
      firstName: 'Alfred',
      lastName: 'Nobel',
      password: 'zxc',
      username: 'nobel',
    },
  ];

  async findByLogin(username: string): Promise<User | undefined> {
    return this.users.find((x) => x.username === username);
  }

  getUserInfoById(userId: number): UserInfo {
    return {
      firstName: 'John',
      lastName: 'Doe',
      userId: userId,
    };
  }
}
