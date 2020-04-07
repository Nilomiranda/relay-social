import { BaseEntity } from '../../common/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/models/user.entity';
import { Post } from '../../posts/models/post.entity';

@ObjectType()
@Entity()
export class Comment extends BaseEntity<Comment> {
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: false })
  @Column({ nullable: false, type: 'text' })
  content: string;

  @Field(type => User)
  @ManyToOne(type => User, { nullable: false })
  user: User

  @ManyToOne(type => Post, post => post.comments)
  post: Post
}