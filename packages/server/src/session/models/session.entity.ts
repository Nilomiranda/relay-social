import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {BaseEntity} from "../../common/base.entity";
import {IsEnum, IsString} from "class-validator";
import {User} from "../../users/models/user.entity";

export enum SessionStatus {
    VALID = 'VALID',
    EXPIRED = 'EXPIRED',
}

@Entity()
@ObjectType()
export class Session extends BaseEntity<Session> {
    @IsEnum(SessionStatus)
    @Column({ type: 'enum', enum: SessionStatus })
    @Field()
    status: SessionStatus;

    @IsString()
    @Column({ type: 'varchar', length: '800', nullable: false })
    @Field({ nullable: false })
    token: string;

    @OneToOne(type => User)
    @JoinColumn()
    @Field(type => User)
    user: User;
}