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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException('Failed to create a user');
    }
  }
}
