import { Args, Field, Float, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './models/post.entity';
import { PostsConnection } from './models/posts.connection';
import { User } from '../users/models/user.entity';
import { PostEdge } from './models/post.edge';
import { PageArgs, PageInfo, PaginationResponse } from '../common/base.entity';
import { PostInput } from './dto/post.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators';
import { ObjectTypeDefinitionFactory } from '@nestjs/graphql/dist/schema-builder/factories/object-type-definition.factory';

@ObjectType()
class Edge {
  @Field(type => PostEdge)
  edge: PostEdge;
}

@Resolver(of => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(type => Edge)
  async newPost(
    @Args('newPostData') newPostData: PostInput,
    @CurrentUser() user: User,
  ): Promise<{ edge: PostEdge }> {
    const post = new Post({ content: newPostData.content, user });
    const createdPost = await this.postsService.createNewPost(post);

    return {
      edge: new PostEdge({
        cursor: createdPost.id,
        node: createdPost,
      }),
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => PostsConnection)
  async posts(
    @CurrentUser() user: User,
    @Args({ name: 'pagination', nullable: true, type: () => PageArgs }) pagination: PageArgs,
    @Args({ name: 'first', nullable: true, type: () => Float }) first: number,
    @Args({ name: 'after', nullable: true, type: () => Float }) after: number,
    @Args({ name: 'last', nullable: true, type: () => Float }) last: number,
    @Args({ name: 'before', nullable: true, type: () => Float }) before: number,
    @Args({ name: 'userId', nullable: true, type: () => Float })
    userId?: number,
  ) {
    // let first, after, last, before;
    // first = pagination?.first;
    // after = pagination?.after;
    // last = pagination?.last;
    // before = pagination?.before;

    const res: PaginationResponse<Post> = await this.postsService.getPosts({
      userId,
      pagination: { first, after, last, before },
    });

    const { data: posts } = res;

    const postEdges = posts.map(
      post =>
        new PostEdge({
          node: post,
          cursor: post.id,
        }),
    );

    return {
      edges: postEdges,
      pageInfo: new PageInfo(res.pageInfo),
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Post)
  async post(@Args('id') id: number) {
    const post = await this.postsService.repo.findOne(id, {
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found', 'POST_NOT_FOUND');
    } else {
      return post;
    }
  }
}
