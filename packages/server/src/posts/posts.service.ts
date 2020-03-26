import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './models/post.entity';
import { PostsConnection } from './models/posts.connection';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) public repo: Repository<Post>) {
  }

  async getPosts(): Promise<Post[]> {
    return this.repo.find();
  }

  async createNewPost(post: Post): Promise<Post> {
    return this.repo.save(post);
  }
}