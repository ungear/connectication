import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async findByLogin(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const profile = new Profile();
    profile.firstName = createUserDto.firstName;
    profile.lastName = createUserDto.lastName;
    await this.profileRepository.save(profile);
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.profile = profile;
    await this.usersRepository.save(user);
    return user;
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

  async getAllUsers(): Promise<User[] | null> {
    return await this.usersRepository.find({
      relations: ['profile'],
    });
  }
}
