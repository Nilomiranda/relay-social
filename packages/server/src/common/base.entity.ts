import { Field, ID, InterfaceType, ObjectType, } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeepPartial,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { ObjectTypeDefinitionFactory } from '@nestjs/graphql/dist/schema-builder/factories/object-type-definition.factory';

@InterfaceType()
export abstract class Node {
  @Field(type => ID)
  id: string;
}

// @ObjectType()
// export class Edge<T> {
//   constructor(obj?: { cursor?: string; node?: T }) {
//     this.cursor = obj.cursor;
//     this.node = obj.node;
//   }
//
//   @Field({ nullable: false })
//   @IsString()
//   cursor: string;
//
//   /**
//    * Generics won't work here cause I need
//    * to explicitly specify what will be returned
//    * Can't what I proposed below
//    */
//   @Field(type => Object, { nullable: false })
//   node: T;
// }

@ObjectType()
export class PageInfo {
  @Field({ nullable: false })
  @IsBoolean()
  hasNextPage: boolean;

  @Field({ nullable: false })
  @IsBoolean()
  hasPreviousPage: boolean;

  @Field({ nullable: false })
  @IsString()
  startCursor: string;

  @Field({ nullable: false })
  @IsString()
  endCursor: string;
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
}
