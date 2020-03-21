import {Field, ObjectType} from "@nestjs/graphql";
import {CreateDateColumn, DeepPartial, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import * as cv from 'class-validator';
import {IsDate, IsInt} from "class-validator";

@ObjectType()
@Entity()
export class BaseEntity<T = {}> {
    constructor(obj?: DeepPartial<T>) {
        Object.assign(this, obj);
    }

    @IsInt()
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @IsDate()
    @Field()
    @CreateDateColumn()
    createdDate?: Date;

    @IsDate()
    @Field()
    @UpdateDateColumn()
    updatedDate?: Date;
}