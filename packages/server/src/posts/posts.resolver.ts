import { Args, Field, Float, ID, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
import { PostPayload } from './models/post.payload';
import { fromGlobalId, toGlobalId } from 'graphql-relay';

@Resolver(of => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(type => PostPayload)
  async newPost(
    @Args('newPostData') newPostData: PostInput,
    @CurrentUser() user: User,
  ): Promise<PostPayload> {
    const post = new Post({ content: newPostData.content, user });
    const createdPost = await this.postsService.createNewPost(post);

    return {
      post: new PostEdge({
        cursor: toGlobalId(post.constructor.name, createdPost.id),
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
  async post(@Args('id') id: string) {
    id = fromGlobalId(id).id
    const post = await this.postsService.repo.findOne(id, {
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found', 'POST_NOT_FOUND');
    } else {
      return post;
    }
  }

  @ResolveField(returns => ID)
  async id(@Parent() parent: Post) {
    const type = parent.constructor.name;
    console.log('type -> ', type);
    const { id } = parent;
    return toGlobalId(type, id);
  }
}
