import {
  Field, GraphQLFactory,
  ID, Info,
  InputType,
  InterfaceType,
  ObjectType, Parent, ResolveField, ResolveProperty, Resolver, Root,
} from '@nestjs/graphql';
import {
  AfterInsert, AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity, EntityManager, getManager, PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { toGlobalId } from 'graphql-relay';

@InterfaceType()
export abstract class Node {
  @Field(type => ID)
  id: string;
}

@InputType()
export class PageArgs {
  @Field({ nullable: true })
  first: number;

  @Field({ nullable: true })
  last: number;

  @Field({ nullable: true })
  after: number;

  @Field({ nullable: true })
  before: number;
}

@ObjectType()
export class PageInfo {
  constructor(props?: any) {
    Object.assign(this, props);
  }

  @Field({ nullable: true })
  @IsBoolean()
  hasNextPage?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  hasPreviousPage?: boolean;

  @Field({ nullable: true })
  @IsString()
  startCursor?: string;

  @Field({ nullable: true })
  @IsString()
  endCursor?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  pageInfo: PageInfo;
}

@ObjectType({
  implements: [Node],
})
@Entity()
export class BaseEntity<T = {}> {
  constructor(obj?: DeepPartial<T>) {
    Object.assign(this, obj);
  }

  @IsString()
  @PrimaryGeneratedColumn()
  id: string;

  @IsDate()
  @Field()
  @CreateDateColumn()
  createdDate?: Date;

  @IsDate()
  @Field()
  @UpdateDateColumn()
  updatedDate?: Date;

  // @AfterLoad()
  // async generateGlobalID(this) {
  //   console.log('this -> ', this);
  //   const type = this.constructor.name;
  //   const { id } = this;
  //   const globalId = toGlobalId(type, id);
  //   console.log('globalId -> ', globalId);
  //   this.id = globalId;
  // }
}
