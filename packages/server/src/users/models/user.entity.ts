import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    Column,
    Entity,
} from "typeorm";
import {BaseEntity} from "../../common/base.entity";

@Entity()
@ObjectType()
export class User extends BaseEntity<User> {
    @Column()
    @Field({ nullable: true })
    name: string;

    @Column()
    @Field({ nullable: true })
    email: string
}