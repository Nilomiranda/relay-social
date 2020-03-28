import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, LessThan, MoreThan, Repository } from 'typeorm';
import { Post } from './models/post.entity';
import { PostsConnection } from './models/posts.connection';
import { PageInfo, PaginationResponse } from '../common/base.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) public repo: Repository<Post>) {}

  async getPosts(findOptions: {
    userId?: number;
    pagination?: { first?: number; after?: number; last?: number; before?: number };
  }): Promise<PaginationResponse<Post>> {
    const { userId, pagination } = findOptions;

    const where = {};
    let order: 'ASC' | 'DESC';

    /**
     * Conditionally creates where conditions
     */
    if (userId) {
      Object.assign(where, { user: { id: userId } });
    }

    if (pagination) {
      if (pagination.first && pagination.last) {
        throw new BadRequestException('First and last pagination params should not be used together', 'WRONG_PAGINATION_PARAMS')
      }

      if (pagination.first && pagination.after) {
        Object.assign(where, {
          id: MoreThan(pagination.after),
        });
      }

      if (pagination.first && pagination.before) {
        Object.assign(where, {
          id: LessThan(pagination.before),
        })
      }

      if (pagination.last && pagination.before) {
        Object.assign(where, {
          id: LessThan(pagination.before),
        })
      }

      if (pagination.last && pagination.after) {
        Object.assign(where, {
          id: MoreThan(pagination.after),
        })
      }
    }

    // determine order
    if (pagination) {
      if (pagination.first && pagination.before) {
        order = 'DESC';
      } else if (pagination.first && pagination.after) {
        order = 'ASC';
      } else if (pagination.last && pagination.before) {
        order = 'DESC';
      } else if (pagination.last && pagination.after) {
        order = 'ASC';
      } else if (pagination.first && !pagination.after && !pagination.before) {
        order = 'ASC';
      } else if (pagination.last && !pagination.after && !pagination.before) {
        order = 'DESC';
      }
    }

    const res = await this.repo.findAndCount({
      where,
      relations: ['user'],
      take: pagination?.first || pagination?.last || 100000000000,
      order: {
        id: order,
      }
    });

    const posts = res[0];
    if (posts.length === 0) {
      throw new NotFoundException(
        `No posts for user with id ${userId}`,
        'NO_POSTS_FOUND',
      );
    }
    const lastCursor = posts[posts.length - 1].id;
    const firstCursor = posts[0].id;

    return {
      data: posts,
      pageInfo: {
        hasNextPage: res[1] > pagination.first,
        endCursor: lastCursor,
        startCursor: firstCursor,
        hasPreviousPage: !(!!pagination?.first)
      },
    };
  }

  async createNewPost(post: Post): Promise<Post> {
    return this.repo.save(post);
  }

  determinePaginationInfo(totalCount: number, data: { first?: number; after?: number; last?: number; before?: number }) {
    const { first, after, last, before } = data;


  }
}
