import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  createPost(userId: number, text: string): Promise<Post> {
    const post = new Post();
    post.text = text;
    post.userId = userId;
    return this.postRepository.save(post);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return await this.postRepository.findBy({ userId: userId });
  }

  async deletePost(postId: number) {
    return await this.postRepository.delete(postId);
  }
}
