import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    UsersModule,
    SessionModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
