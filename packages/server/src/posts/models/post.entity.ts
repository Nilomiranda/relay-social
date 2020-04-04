import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType, ResolveField } from '@nestjs/graphql';
import { BaseEntity } from '../../common/base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/models/user.entity';
import { CommentsConnection } from '../../comments/model/comments.connection';
import { Comment } from '../../comments/model/comment.entity';

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

  @Field(type => CommentsConnection)
  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[] | CommentsConnection;
}
