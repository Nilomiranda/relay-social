import {Module} from "@nestjs/common";
import {UsersResolver} from "./users.resolver";
import {UsersService} from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user.entity";

@Module({
    providers: [UsersResolver, UsersService],
    imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}