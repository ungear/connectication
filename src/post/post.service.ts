import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  createPost(createPostDto: CreatePostDto) {
    const post = new Post();
    post.text = createPostDto.text;
    post.userId = createPostDto.userId;
    this.postRepository.save(post);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    const posts = await this.postRepository.findBy({ userId: userId });
    return posts;
  }

  deletePost(postId: number) {
    console.log('removing post ' + postId);
  }
}
