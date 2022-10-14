import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  @HttpCode(204)
  async createPost(@Body() createPostDto: CreatePostDto) {
    this.postService.createPost(createPostDto);
  }

  @Delete(':postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    this.postService.deletePost(postId);
  }
}
