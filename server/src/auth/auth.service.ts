import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersPrismaRepository } from 'src/users/users-prisma.repository';
import { LocalLoginPrototype, Provider } from './auth.types';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiration: string;
  private readonly refreshTokenExpiration: string;

  constructor(
    private readonly usersPrisma: UsersPrismaRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenExpiration = this.configService.get<string>(
      'ACCESS_TOKEN_TIME',
    ) as string;
    this.refreshTokenExpiration = this.configService.get<string>(
      'REFRESH_TOKEN_TIME',
    ) as string;
  }

  async localLogin(prototype: LocalLoginPrototype, provider: Provider) {
    const { email, password } = prototype;

    const user = await this.usersPrisma.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }
    if (user.provider !== provider) {
      throw new ConflictException('이미 가입된 계정입니다.');
    }
    if (!(await this.validatePassword(password, user.password))) {
      throw new ConflictException('잘못된 비밀번호 입니다.');
    }

    return {
      refreshToken: await this.generateToken(
        user.id,
        this.refreshTokenExpiration,
      ),
      accessToken: await this.generateToken(
        user.id,
        this.accessTokenExpiration,
      ),
      name: user.name,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.get<number>(
      'PASSWORD_SALT',
    ) as number;

    return bcrypt.hash(password, saltRounds);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken(userId: string, expiredTime: string) {
    const paylod = { sub: userId };
    return await this.jwtService.signAsync(paylod, {
      expiresIn: expiredTime,
    });
  }
}
