import {Field, InputType} from "@nestjs/graphql";
import {IsString} from "class-validator";

@InputType()
export class LoginInput {
    @Field({ nullable: false })
    @IsString()
    email: string;

    @Field({ nullable: false })
    @IsString()
    password: string;
}