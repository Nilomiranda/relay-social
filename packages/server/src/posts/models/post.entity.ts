import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/models/user.entity';

@Entity()
@ObjectType()
export class Post extends BaseEntity<Post> {
  @Column({ type: 'text', nullable: false })
  @IsString()
  @Field({ nullable: false })
  content: string;

  @IsNotEmpty({ always: true })
  @Field(type => User, { nullable: false })
  @ManyToOne(type => User)
  user: User;
}
