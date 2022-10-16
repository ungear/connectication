import { Injectable } from '@nestjs/common';
import { UserInfo } from './interfaces/user-info.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByLogin(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  getUserInfoById(userId: number): UserInfo {
    return {
      firstName: 'John',
      lastName: 'Doe',
      userId: userId,
    };
  }
}
