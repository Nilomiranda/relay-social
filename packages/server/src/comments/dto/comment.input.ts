import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CommentInput {
  @IsString()
  @Field({ nullable: false })
  content: string;

  @Field({ nullable: false })
  postId: string; // global ID -> will be converted back to number id later
}