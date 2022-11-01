import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Profile } from './profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/all-profiles')
  async getAllUsersInfo(): Promise<Profile[] | null> {
    return await this.userService.getAllUsersProfile();
  }

  @Get(':id/profile')
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<Profile | null> {
    const profile = await this.userService.getProfileByUserId(userId);
    if (!profile) throw new NotFoundException('Profile Not Found');
    return profile;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      const securityData = await this.authService.login(user);
      return { ...user, ...securityData };
    } catch (error) {
      throw new BadRequestException('Failed to create a user');
    }
  }
}
