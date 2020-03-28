import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/models/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context[2];
    return ctx.req.user.user;
  }
);