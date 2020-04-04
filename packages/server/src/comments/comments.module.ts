import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './model/comment.entity';
import { CommentsResolver } from './comments.resolver';
import { Post } from '../posts/models/post.entity';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports: [TypeOrmModule.forFeature([Comment, Post])],
})
export class CommentsModule {}