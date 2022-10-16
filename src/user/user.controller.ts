import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from './models/userInfo.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/info')
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserInfo | null> {
    const userInfo = await this.userService.getUserInfoById(userId);
    if (!userInfo) throw new NotFoundException('User Not Found');
    return userInfo;
  }
}
