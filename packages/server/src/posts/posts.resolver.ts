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
import { CommentsConnection } from '../comments/model/comments.connection';
import { CommentsResolver } from '../comments/comments.resolver';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/model/comment.entity';
import { CommentEdge } from '../comments/model/comment.edge';

@Resolver(of => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

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
    @Args({ name: 'after', nullable: true, type: () => String }) after: string,
    @Args({ name: 'last', nullable: true, type: () => Float }) last: number,
    @Args({ name: 'before', nullable: true, type: () => String }) before: string,
    @Args({ name: 'order', nullable: true, type: () => String }) order: 'ASC' | 'DESC',
    @Args({ name: 'userId', nullable: true, type: () => Float })
    userId?: number,
  ) {
    const res: PaginationResponse<Post> = await this.postsService.getPosts({
      userId,
      pagination: { first, after, last, before, order },
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
    // id = fromGlobalId(id).id
    // const post = await this.postsService.repo.findOne(id, {
    //   relations: ['user'],
    // });

    const post = await this.postsService.getOnePost(id);

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

  @ResolveField(returns => CommentsConnection)
  async comments(
    @Parent() parent: Post,
    @Args({ name: 'first', nullable: true, type: () => Float }) first: number,
    @Args({ name: 'after', nullable: true, type: () => String }) after: string,
    @Args({ name: 'last', nullable: true, type: () => Float }) last: number,
    @Args({ name: 'before', nullable: true, type: () => String }) before: string,
    @Args({ name: 'order', nullable: true, type: () => String }) order: 'ASC' | 'DESC',
  ) {
    console.log('post in comments resolve field -> ', parent);
    // await this.postsService.getCommentsFromPost(parent.id);
    const res: PaginationResponse<Comment> = await this.commentsService.getComments({
      pagination: { first, after, last, before, order },
    });

    const { data: comments } = res;

    const commentsEdge = comments.map(comment => new CommentEdge({
      node: comment,
      cursor: comment.id,
    }));

    return {
      edges: commentsEdge,
      pageInfo: new PageInfo(res.pageInfo),
    }
  }
}
