import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('all-posts/:userId')
  getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postService.getUserPosts(userId);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.postService.createPost(createPostDto);
    } catch (error) {
      throw new BadRequestException('Failed to create a post');
    }
  }

  @Delete(':postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    this.postService.deletePost(postId);
  }
}
