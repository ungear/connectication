import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id/info')
  someData(@Param('id') userId: string): string {
    return 'basic data for user ' + userId;
  }
}
