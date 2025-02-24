import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LoginRequest } from 'shared/types/dto/auth/login.request';
import { Response } from 'express';
import { LoginResponse } from 'shared/types/dto/auth/login.response';
import { RegisterRequest } from 'shared/types/dto/auth/register.request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    const loginResponse = await this.authService.localLogin(dto, 'LOCAL');

    const { refreshToken, ...responseWithoutRefresh } = loginResponse;

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.configService.get<number>('REFRESH_COOKIE_TIME') as number,
    });

    return responseWithoutRefresh;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('register')
  async localRegister(@Body() dto: RegisterRequest) {
    await this.authService.register({ provider: 'LOCAL', ...dto });
  }
}
