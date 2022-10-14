import { Body, Controller, Delete, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
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

  @Delete(':postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    this.postService.deletePost(postId);
  }
}
