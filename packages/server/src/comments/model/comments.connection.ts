import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../common/base.entity';
import { CommentEdge } from './comment.edge';

@ObjectType()
export class CommentsConnection {
  @Field(type => [CommentEdge], { nullable: false })
  edges: CommentEdge[];

  @Field(type => PageInfo)
  pageInfo: PageInfo

}