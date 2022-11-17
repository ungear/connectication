import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('all-posts/:userId')
  getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postService.getUserPosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    try {
      return await this.postService.createPost(
        req.user.userId,
        createPostDto.text,
      );
    } catch (error) {
      throw new BadRequestException('Failed to create a post');
    }
  }

  @Delete(':postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    this.postService.deletePost(postId);
  }
}
