import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, SessionStatus } from './models/session.entity';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { UsersModule } from '../users/users.module';
import { User } from '../users/models/user.entity';

@Module({
  providers: [SessionService, SessionResolver],
  imports: [TypeOrmModule.forFeature([Session, User])],
})
export class SessionModule {}
