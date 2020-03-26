import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from './post.entity';
import { IsString } from 'class-validator';

@ObjectType()
export class PostEdge {
  constructor(edge: PostEdge) {
    Object.assign(this, edge);
  }

  @Field({ nullable: false })
  @IsString()
  cursor: string;

  @Field({ nullable: false })
  node: Post;
}