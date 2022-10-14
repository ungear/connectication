import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  createPost(createPostDto: CreatePostDto) {
    console.log('creating post with text ' + createPostDto.text);
  }

  deletePost(postId: number) {
    console.log('removing post ' + postId);
  }
}
