import { Field, ObjectType } from '@nestjs/graphql';
import { CommentEdge } from './comment.edge';
import { Comment } from './comment.entity';

@ObjectType()
export class CommentPayload {
  @Field(type => CommentEdge)
  comment: Comment;
}
