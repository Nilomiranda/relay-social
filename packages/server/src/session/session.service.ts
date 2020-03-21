import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session, SessionStatus } from './models/session.entity';
import { LoginInput } from './dto/login.input';
import { User } from '../users/models/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import auth from '../common/config/auth';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) public repo: Repository<Session>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async login(login: LoginInput): Promise<Session> {
    const { email, password } = login;

    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials', 'WRONG_CREDENTIALS');
    }

    if (user && !(await this.isPasswordCorrect(password, user))) {
      throw new UnauthorizedException('Wrong credentials', 'WRONG_CREDENTIALS');
    }

    const token = await this.generateToken(user);

    const previousSession = await this.repo.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });

    const session = new Session({ user, status: SessionStatus.VALID, token });

    if (previousSession) {
      previousSession.token = token;
      return this.repo.save(previousSession);
    } else {
      return this.repo.save(session);
    }
  }

  async validateSession(token: string): Promise<User> {
    const session = await this.repo.findOne({
      where: { token, status: SessionStatus.VALID },
      relations: ['user'],
    });

    if (!session) {
      throw new NotFoundException('Invalid session', 'INVALID_SESSION');
    }

    return session.user;
  }

  async isPasswordCorrect(password: string, user: User): Promise<boolean> {
    const passwordChecked = await bcrypt.compare(password, user.passwordHash);
    return passwordChecked;
  }

  async generateToken(user: User): Promise<string> {
    const token = jwt.sign({ data: user }, auth.secret);
    return token;
  }
}
