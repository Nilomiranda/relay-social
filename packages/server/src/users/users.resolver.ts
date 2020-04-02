import {
  Args,
  Context, ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { UserInput } from './dto/user.input';
import { PostsConnection } from '../posts/models/posts.connection';
import { PostsService } from '../posts/posts.service';
import { PostEdge } from '../posts/models/post.edge';
import { PageInfo } from '../common/base.entity';
import { toGlobalId } from 'graphql-relay';

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
  user(@Args('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Mutation(returns => User)
  async addUser(@Args('newUserData') newUserData: UserInput): Promise<User> {
    return this.usersService.createNewUser(newUserData);
  }

  @ResolveField(returns => ID)
  async id(@Parent() parent: User) {
    const type = parent.constructor.name;
    const { id } = parent;
    return toGlobalId(type, id);
  }
}
