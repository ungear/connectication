import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @HttpCode(204)
  async createPost(@Body() createPostDto: CreatePostDto) {
    this.postService.createPost(createPostDto);
  }
}
