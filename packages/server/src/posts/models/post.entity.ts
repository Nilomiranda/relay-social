import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/base.entity';
import { IsString } from 'class-validator';

@Entity()
@ObjectType()
export class Post extends BaseEntity<Post> {
  @Column({ type: 'text', nullable: false })
  @IsString()
  @Field({ nullable: false })
  content: string;
}