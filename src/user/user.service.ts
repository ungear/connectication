import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInfo } from './models/userInfo.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByLogin(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async getUserInfoById(userId: number): Promise<UserInfo | null> {
    const user = await this.usersRepository.findOneBy({ userId });
    if (user) {
      return new UserInfo(user);
    } else return null;
  }
}
