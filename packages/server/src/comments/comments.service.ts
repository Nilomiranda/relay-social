import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './model/comment.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CommentInput } from './dto/comment.input';
import { Post } from '../posts/models/post.entity';
import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { User } from '../users/models/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) public repo: Repository<Comment>,
    @InjectRepository(Post) public postRepo: Repository<Post>,
    @InjectRepository(User) public userRepo: Repository<User>,
  ) {
  }

  async getComments(findOptions: {
    postId?: number | string;
    pagination?: { first?: number; after?: string; last?: number; before?: string, order: 'ASC' | 'DESC' };
  }) {
    const { postId, pagination } = findOptions;

    const where = {};
    // let order: 'ASC' | 'DESC';
    pagination.order = pagination.order || 'DESC';
    /**
     * Conditionally creates where conditions
     */
    if (postId) {
      Object.assign(where, { post: { id: postId } });
    }

    if (pagination) {
      if (pagination.first && pagination.last) {
        throw new BadRequestException('First and last pagination params should not be used together', 'WRONG_PAGINATION_PARAMS')
      }

      if (pagination.first && pagination.before) {
        throw new BadRequestException('First and before pagination params should not be used together', 'FORBIDDEN_FIRST_BEFORE');
      }

      if (pagination.last && pagination.after) {
        throw new BadRequestException('Last and after pagination params should no be used together', 'FORBIDDEN_LAST_AFTER');
      }

      /**
       * pagination after and before will receive
       * string like arguments
       * This is the globalID
       * We first convert them back to id as number to correctly
       * insert in query params
       */
      if (pagination.first && pagination.after) {
        pagination.after = fromGlobalId(pagination.after).id;
        if (pagination.order === 'DESC') {
          Object.assign(where, {
            id: LessThan(pagination.after),
          });
        } else {
          Object.assign(where, {
            id: MoreThan(pagination.after),
          });
        }
      }

      if (pagination.last && pagination.before) {
        pagination.before = fromGlobalId(pagination.before).id;
        if (pagination.order === 'DESC') {
          Object.assign(where, {
            id: MoreThan(pagination.before),
          })
        } else {
          Object.assign(where, {
            id: LessThan(pagination.before),
          })
        }
      }
    }

    const relations: string[] = [];

    if (postId) {
      relations.push('post');
    }

    const res = await this.repo.findAndCount({
      where,
      relations,
      take: pagination?.first || pagination?.last || 100000000000,
      order: {
        createdDate: pagination.order,
      }
    });

    // posts is the first element in the array (the second one is the count result)
    let comments = res[0];

    const lastCursor = toGlobalId('Post', comments[comments.length - 1]?.id )|| null;
    const firstCursor = toGlobalId('Post', comments[0]?.id) || null;

    return {
      data: comments || [],
      pageInfo: {
        hasNextPage: res[1] > pagination.first,
        endCursor: lastCursor,
        startCursor: firstCursor,
        hasPreviousPage: !(!!pagination?.first)
      },
    };
  }

  async createNewComment(commentInput: CommentInput, user: User) {
    const parsedPostId = fromGlobalId(commentInput.postId);
    const post = await this.postRepo.findOne(parsedPostId);

    if (!post) {
      throw new NotFoundException('Post not found', 'POST_NOT_FOUND');
    }

    console.log('user who is commenting -> ', user);

    const comment = new Comment({
      content: commentInput.content,
      post: post,
      user,
    })

    return this.repo.save(comment);
  }

  async getUserFromPost(commentId: string): Promise<User> {
    // const commentIdAsNumber = fromGlobalId(commentId).id;
    console.log('let us resolve user from comment');
    const { user } = await this.repo.findOne({
      where: {
        id: commentId,
      },
      relations: ['user'],
    });

    return user;
  }
}