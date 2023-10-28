import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Checks if login and password are valid. Returns userId
  async validateUser(login: string, pass: string): Promise<number> {
    const user = await this.userService.findByLogin(login);
    if (user && user.password === pass) {
      return user.id;
    }
    return null;
  }

  // Composes JWT payload and returns token
  getJwt(userId: number): { access_token: string } {
    const payload = {
      sub: userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
