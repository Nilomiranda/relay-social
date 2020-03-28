import { Args, Context, GqlExecutionContext, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Session } from './models/session.entity';
import { SessionService } from './session.service';
import { LoginInput } from './dto/login.input';
import { User } from '../users/models/user.entity';
import { ExecutionContext, Req } from '@nestjs/common';
import { Response } from 'express';

@Resolver(of => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Query(returns => User)
  async validateSession(@Args('token') token: string): Promise<User> {
    return this.sessionService.validateSession(token);
  }

  @Mutation(returns => Session)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Session> {
    const session = await this.sessionService.login(loginInput);
    return session;
  }
}
