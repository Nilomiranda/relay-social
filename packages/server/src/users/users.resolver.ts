import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { UserInput } from './dto/user.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
}
