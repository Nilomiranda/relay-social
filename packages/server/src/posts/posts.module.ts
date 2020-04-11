import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { Post } from './models/post.entity';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/model/comment.entity';
import { User } from '../users/models/user.entity';

@Module({
  providers: [PostsResolver, PostsService, CommentsService],
  imports: [TypeOrmModule.forFeature([Post, Comment, User])],
  exports: [PostsService],
})
export class PostsModule {}
