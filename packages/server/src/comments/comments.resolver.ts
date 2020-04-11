import { Args, Float, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Comment } from './model/comment.entity';
import { CommentsService } from './comments.service';
import { CommentsConnection } from './model/comments.connection';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/auth.guard';
import { CommentEdge } from './model/comment.edge';
import { PageInfo, PaginationResponse } from '../common/base.entity';
import { CommentPayload } from './model/comment.payload';
import { CommentInput } from './dto/comment.input';
import { CurrentUser } from '../common/decorators';
import { User } from '../users/models/user.entity';
import { PostEdge } from '../posts/models/post.edge';
import { toGlobalId } from 'graphql-relay';
import { Post } from '../posts/models/post.entity';

@Resolver(of => Comment)
export class CommentsResolver {
  constructor(private readonly service?: CommentsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => CommentsConnection)
  async comments(
    @Args({ name: 'first', nullable: true, type: () => Float }) first?: number,
    @Args({ name: 'after', nullable: true, type: () => String }) after?: string,
    @Args({ name: 'last', nullable: true, type: () => Float }) last?: number,
    @Args({ name: 'before', nullable: true, type: () => String }) before?: string,
    @Args({ name: 'order', nullable: true, type: () => String }) order?: 'ASC' | 'DESC',
  ): Promise<CommentsConnection> {
    console.log('COMMENTS RESOLVER HANDLED');

    const res: PaginationResponse<Comment> = await this.service.getComments({
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

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => CommentPayload)
  async postNewComment(
    @Args('commentInput') commentInput: CommentInput,
    @CurrentUser() user: User
  ) {
    const createComment = await this.service.createNewComment(commentInput, user);

    console.log('createComment -> ', createComment);

    return {
      comment: new CommentEdge({
        cursor: toGlobalId(createComment.constructor.name, createComment.id),
        node: createComment,
      }),
    }
  }

  @ResolveField(returns => User)
  async user(@Parent() parent: Comment) {
    return this.service.getUserFromPost(parent.id);
  }
}