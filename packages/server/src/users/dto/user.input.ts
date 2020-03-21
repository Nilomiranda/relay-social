import {Field, InputType} from "@nestjs/graphql";
import {User} from "../models/user.entity";

@InputType()
export class UserInput  {
    @Field()
    name: string;

    @Field()
    email: string;
}