import { Field, InputType } from '@nestjs/graphql';
import { User } from '../models/user.entity';

@InputType()
export class UserInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}
