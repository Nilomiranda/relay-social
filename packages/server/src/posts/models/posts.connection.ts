import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../common/base.entity';
import { PostEdge } from './post.edge';
// import { PostEdge } from './post.edge';

@ObjectType()
export class PostsConnection {
  @Field(type => [PostEdge],{ nullable: false })
  edges: PostEdge[];

  @Field(type => PageInfo)
  pageInfo: PageInfo;
}
