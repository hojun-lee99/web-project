import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersPrismaRepository } from './users-prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersPrismaRepository],
  exports: [UsersPrismaRepository],
})
export class UsersModule {}
