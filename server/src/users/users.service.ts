// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: {
    email: string;
    password: string;
    nickname: string;
  }): Promise<UserWithoutPassword> {
    try {
      const user = await this.prisma.user.create({
        data,
        select: {
          id: true,
          email: true,
          nickname: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email or nickname already exists');
        }
      }
      throw error;
    }
  }

  async update(
    id: number,
    data: Partial<{ email: string; nickname: string }>,
  ): Promise<UserWithoutPassword> {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Partial<Prisma.UserWhereInput>;
  }): Promise<UserWithoutPassword[]> {
    const { skip, take, where } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where: {
        ...where,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }
}
