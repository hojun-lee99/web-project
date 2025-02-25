import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInfo } from './user.types';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<UserInfo | null> {
    return await this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        provider: true,
      },
      where: {
        email: email,
      },
    });
  }

  async findOneById(userId: string): Promise<UserInfo | null> {
    return await this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        provider: true,
      },
      where: {
        id: userId,
      },
    });
  }

  async save(data: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data,
    });
  }
}
