import { Provider } from 'src/auth/auth.types';
import { UserInfo, UserPrototype } from './user.types';

export class UserEntity {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
    readonly password: string,
    readonly provider: Provider,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  static create(
    input: UserPrototype,
    hashedPassword: string,
    idGen: () => string,
    stdDate: Date,
    updatedAt?: Date,
  ): UserEntity {
    return new UserEntity(
      idGen(),
      input.email,
      input.name,
      hashedPassword,
      input.provider,
      stdDate,
      updatedAt ? updatedAt : stdDate,
    );
  }
}
