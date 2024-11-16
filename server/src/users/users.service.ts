import { Injectable } from '@nestjs/common';
import { User } from 'src/types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'john@example.com',
      nickname: 'john',
      password: 'changeme',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      email: 'maria@example.com',
      nickname: 'maria',
      password: 'guess',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
