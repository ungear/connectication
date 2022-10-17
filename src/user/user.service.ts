import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByLogin(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async getProfileByUserId(userId: number): Promise<Profile | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    if (user && user.profile) {
      return user.profile;
    } else return null;
  }
}
