import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './model/comment.entity';
import { Repository } from 'typeorm';
import { CommentInput } from './dto/comment.input';
import { Post } from '../posts/models/post.entity';
import { fromGlobalId } from 'graphql-relay';
import { User } from '../users/models/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) public repo: Repository<Comment>,
    @InjectRepository(Post) public postRepo: Repository<Post>,
    @InjectRepository(User) public userRepo: Repository<User>,
  ) {
  }

  async createNewComment(commentInput: CommentInput, user: User) {
    const parsedPostId = fromGlobalId(commentInput.postId);
    const post = await this.postRepo.findOne(parsedPostId);

    if (!post) {
      throw new NotFoundException('Post not found', 'POST_NOT_FOUND');
    }

    console.log('user who is commenting -> ', user);

    const comment = new Comment({
      content: commentInput.content,
      post: post,
      user,
    })

    return this.repo.save(comment);
  }

  async getUserFromPost(commentId: string): Promise<User> {
    // const commentIdAsNumber = fromGlobalId(commentId).id;

    const { user } = await this.repo.findOne({
      where: {
        id: commentId,
      },
      relations: ['user'],
    });

    return user;
  }
}