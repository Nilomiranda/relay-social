import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './dto/user.input';
import * as bcrypt from 'bcrypt';
import { fromGlobalId } from 'graphql-relay';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) public repo: Repository<User>) {}

  async getUsers() {
    return this.repo.find();
  }

  async getUser(id: string) {
    console.log('fromGlobalId(id) -> ', fromGlobalId(id));
    id = fromGlobalId(id).id
    return this.repo.findOne(id);
  }

  async createNewUser(userData: UserInput) {
    const { password, email } = userData;

    if (await this.isEmailInUse(email)) {
      throw new ConflictException('Email already in use', 'EMAIL_IN_USE');
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = new User(userData);

    user.passwordHash = passwordHash;

    return this.repo.save(user);
  }

  async isEmailInUse(email: string): Promise<boolean> {
    const user = await this.repo.findOne({ where: { email } });

    return !!user;
  }
}
