import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedUserInReq } from './types/authenticatedUserInReq.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // Accepts login and password, adds user to req
  async validate(
    login: string,
    password: string,
  ): Promise<AuthenticatedUserInReq> {
    const userId = await this.authService.validateUser(login, password);
    if (!userId) {
      throw new UnauthorizedException();
    }
    return { userId };
  }
}
