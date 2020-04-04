import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Comment } from './comment.entity';

@ObjectType()
export class CommentEdge {
  constructor(edge: CommentEdge) {
    Object.assign(this, edge)
  }

  @Field()
  @IsString()
  cursor: string;

  @Field({ nullable: false })
  node: Comment;
}