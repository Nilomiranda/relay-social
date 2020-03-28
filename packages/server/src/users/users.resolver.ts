import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { UserInput } from './dto/user.input';
import { PostsConnection } from '../posts/models/posts.connection';
import { PostsService } from '../posts/posts.service';
import { PostEdge } from '../posts/models/post.edge';
import { PageInfo } from '../common/base.entity';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => [User])
  users(@Context() context: any): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Query(returns => User)
  user(@Args('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Mutation(returns => User)
  async addUser(@Args('newUserData') newUserData: UserInput): Promise<User> {
    return this.usersService.createNewUser(newUserData);
  }

  @ResolveField(returns => PostsConnection)
  async posts(@Parent() user: User) {
    const { id } = user;
    const posts = await this.postsService.repo.find({ where: { user: { id, } } })

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
