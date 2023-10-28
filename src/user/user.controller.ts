import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Profile } from './profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedUserInReq } from '../auth/types/authenticatedUserInReq.interface';
import { User } from './user.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/all')
  async getAllUsersInfo(): Promise<User[] | null> {
    const users = await this.userService.getAllUsers();
    // TODO find a better way to remove passwords from responses. Consider https://stackoverflow.com/a/59140504
    return users.map((x) => ({ ...x, password: null }));
  }

  @Get(':id/profile')
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<Profile | null> {
    const profile = await this.userService.getProfileByUserId(userId);
    if (!profile) throw new NotFoundException('Profile Not Found');
    return profile;
  }

  // Get user info by provided JWT
  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentUserInfo(
    @Request() req,
  ): Promise<{ userId: number; profile: Profile }> {
    const authenticatedUserSummary: AuthenticatedUserInReq = req.user;
    const profile = await this.userService.getProfileByUserId(
      authenticatedUserSummary.userId,
    );
    return {
      userId: authenticatedUserSummary.userId,
      profile,
    };
  }

  @Post()
  @ApiOkResponse({ type: User })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      const securityData = await this.authService.getJwt(user.id);
      return { ...user, ...securityData };
    } catch (error) {
      throw new BadRequestException('Failed to create a user');
    }
  }
}
