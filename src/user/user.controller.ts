import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/info')
  someData(@Param('id', ParseIntPipe) userId: number): User {
    return this.userService.getUserInfoById(userId);
  }
}
