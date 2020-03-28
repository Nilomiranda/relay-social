import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { PostsModule } from '../posts/posts.module';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/models/post.entity';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [PostsModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
