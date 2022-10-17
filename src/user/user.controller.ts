import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Profile } from './profile.entity';

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
}
