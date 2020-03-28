import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { Post } from './models/post.entity';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [TypeOrmModule.forFeature([Post])],
  exports: [PostsService],
})
export class PostsModule {}
