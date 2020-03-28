import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, SessionStatus } from './models/session.entity';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { UsersModule } from '../users/users.module';
import { User } from '../users/models/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import authConfig from '../common/config/auth';
import { JwtStrategy } from '../common/auth/jwt.strategy';

@Module({
  providers: [SessionService, SessionResolver, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([Session, User]),
  ],
})
export class SessionModule {}
