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

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    post.text = createPostDto.text;
    post.userId = createPostDto.userId;
    return this.postRepository.save(post);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return await this.postRepository.findBy({ userId: userId });
  }

  deletePost(postId: number) {
    console.log('removing post ' + postId);
  }
}
