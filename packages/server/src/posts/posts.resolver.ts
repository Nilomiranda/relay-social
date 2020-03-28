import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
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

@Resolver(of => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(type => Post)
  async newPost(
    @Args('newPostData') newPostData: PostInput,
    @CurrentUser() user: User,
  ): Promise<Post> {
    const post = new Post({ content: newPostData.content, user });
    return this.postsService.createNewPost(post);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => PostsConnection)
  async posts(
    @CurrentUser() user: User,
    @Args({ name: 'pagination', nullable: true, type: () => PageArgs }) pagination: PageArgs,
    @Args({ name: 'userId', nullable: true, type: () => Float })
    userId?: number,
  ) {
    let first, after, last, before;
    first = pagination?.first;
    after = pagination?.after;
    last = pagination?.last;
    before = pagination?.before;

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
