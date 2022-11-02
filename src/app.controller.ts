import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthenticatedUserInReq } from './auth/types/authenticatedUserInReq.interface';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Hello';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const authenticatedUserSummary: AuthenticatedUserInReq = req.user;
    return this.authService.getJwt(authenticatedUserSummary.userId);
  }

  // TODO: remove the /protected endpoint
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProfile(@Request() req) {
    return req.user;
  }
}
