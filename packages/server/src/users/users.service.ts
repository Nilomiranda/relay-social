import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {Repository} from "typeorm";
import {UserInput} from "./dto/user.input";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) public repo: Repository<User>) {
    }

    async getUsers() {
        return this.repo.find();
    }

    async getUser(id: number) {
        return this.repo.findOne(id);
    }

    async createNewUser(userData: UserInput) {
        return this.repo.save(new User(userData));
    }
}