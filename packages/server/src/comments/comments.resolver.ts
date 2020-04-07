import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Comment } from './model/comment.entity';
import { CommentsService } from './comments.service';
import { CommentsConnection } from './model/comments.connection';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/auth.guard';
import { CommentEdge } from './model/comment.edge';
import { PageInfo } from '../common/base.entity';
import { CommentPayload } from './model/comment.payload';
import { CommentInput } from './dto/comment.input';
import { CurrentUser } from '../common/decorators';
import { User } from '../users/models/user.entity';
import { PostEdge } from '../posts/models/post.edge';
import { toGlobalId } from 'graphql-relay';

@Resolver(of => Comment)
export class CommentsResolver {
  constructor(private readonly service: CommentsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => CommentsConnection)
  async comments(): Promise<CommentsConnection> {
    const comments = await this.service.repo.find();

    const commentsEdge = comments.map(comment => new CommentEdge({
      node: comment,
      cursor: comment.id,
    }));

    return {
      edges: commentsEdge,
      pageInfo: new PageInfo(),
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