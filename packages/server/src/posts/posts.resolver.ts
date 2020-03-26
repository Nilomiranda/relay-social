import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './models/post.entity';
import { PostsConnection } from './models/posts.connection';
// import { PostEdge } from './models/post.edge';
import { User } from '../users/models/user.entity';
import { PostEdge } from './models/post.edge';
import { PageInfo } from '../common/base.entity';
import { PostInput } from './dto/post.input';
// import { Edge, PageInfo } from '../common/base.entity';

@Resolver(of => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(type => Post)
  async newPost(@Args('newPostData') newPostData: PostInput): Promise<Post> {
    const post = new Post({ content: newPostData.content });
    return this.postsService.createNewPost(post);
  }

  @Query(returns => PostsConnection)
  async posts() {
    const posts: Post[] = await this.postsService.getPosts();

    const postEdges = posts.map(post => new PostEdge({
      node: post,
      cursor: post.id,
    }));

    return {
      edges: postEdges,
      pageInfo: new PageInfo(),
    }
  }
}