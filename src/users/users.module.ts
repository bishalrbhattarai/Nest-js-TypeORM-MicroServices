import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersMiddleware } from './users.middleware';
import path from 'path';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes(
      { path: 'users', method: RequestMethod.GET },
      { path: "users", method: RequestMethod.POST },
      { path: "users/:id", method: RequestMethod.PATCH }
    );
  }
}
