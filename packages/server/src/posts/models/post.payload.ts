import { Field, ObjectType } from '@nestjs/graphql';
import { PostEdge } from './post.edge';

@ObjectType()
export class PostPayload {
  @Field(type => PostEdge)
  post: PostEdge;
}