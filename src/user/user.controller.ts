import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from './interfaces/user-info.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/info')
  someData(@Param('id', ParseIntPipe) userId: number): UserInfo {
    return this.userService.getUserInfoById(userId);
  }
}
