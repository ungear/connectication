import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {
  createPost(createPostDto: CreatePostDto) {
    console.log('creating post with text ' + createPostDto.text);
  }

  getUserPosts(userId: number): Post[] {
    return [{ userId: userId, text: 'aaaaaaa bbbbb cc' }];
  }

  deletePost(postId: number) {
    console.log('removing post ' + postId);
  }
}
