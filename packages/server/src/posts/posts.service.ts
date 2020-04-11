import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, getConnection, LessThan, MoreThan, Repository } from 'typeorm';
import { Post } from './models/post.entity';
import { PostsConnection } from './models/posts.connection';
import { PageInfo, PaginationResponse } from '../common/base.entity';
import { CommentEdge } from '../comments/model/comment.edge';
import { Comment } from '../comments/model/comment.entity';
import { fromGlobalId, toGlobalId } from 'graphql-relay';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) public repo: Repository<Post>,
  ) {}

  async getPosts(findOptions: {
    userId?: number;
    pagination?: { first?: number; after?: string; last?: number; before?: string, order: 'ASC' | 'DESC' };
  }): Promise<PaginationResponse<Post>> {
    const { userId, pagination } = findOptions;

    const where = {};
    // let order: 'ASC' | 'DESC';
    pagination.order = pagination.order || 'DESC';
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

    const res = await this.repo.findAndCount({
      where,
      relations: ['user'],
      take: pagination?.first || pagination?.last || 100000000000,
      order: {
        createdDate: pagination.order,
      }
    });

    // posts is the first element in the array (the second one is the count result)
    let posts = res[0];

    // posts = this.convertCommentsToCommentsConnection(posts);

    const lastCursor = toGlobalId('Post', posts[posts.length - 1]?.id )|| null;
    const firstCursor = toGlobalId('Post', posts[0]?.id) || null;

    return {
      data: posts || [],
      pageInfo: {
        hasNextPage: res[1] > pagination.first,
        endCursor: lastCursor,
        startCursor: firstCursor,
        hasPreviousPage: !(!!pagination?.first)
      },
    };
  }

  async getOnePost(postId: string) {
    const id = fromGlobalId(postId).id
    const post = await this.repo.findOne(id, {
      relations: ['user', 'comments'],
    });

    const postWithCommentsConnection = this.convertCommentsToCommentsConnection([post]);

    return postWithCommentsConnection[0];
  }

  async createNewPost(post: Post): Promise<Post> {
    return this.repo.save(post);
  }

  convertCommentsToCommentsConnection(posts: Post[]) {
    posts.forEach(post => {
      const commentEdges = (post.comments as Comment[]).map(comment => {
        return new CommentEdge({
          node: comment,
          cursor: comment.id,
        })
      });

      post.comments = {
        edges: commentEdges,
        pageInfo: new PageInfo(),
      }
    });

    return posts;
  }

  async getCommentsFromPost(postId: number | string) {
    console.log('post id to get comments -> ', postId);

    const comments = await getConnection()
      .createQueryBuilder()
      .select('comment')
      .from(Comment, 'comment')
      .leftJoin('comment.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();

    console.log('fetched comments -> ', comments);
  }
}
