import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class User extends BaseEntity<User> {
  @Column({ type: 'varchar', length: '100' })
  @Field({ nullable: false })
  name: string;

  @IsEmail()
  @Column({ type: 'varchar', length: '100' })
  @Field({ nullable: false })
  email: string;

  @IsString()
  @Column({ type: 'varchar', length: '255' })
  @Exclude()
  passwordHash: string;
}
