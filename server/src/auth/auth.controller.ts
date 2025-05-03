import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LoginRequest } from 'src/shared/types/dto/auth/request/login.request';
import { Response } from 'express';
import { LoginResponse } from 'src/shared/types/dto/auth/response/login.response';
import { RegisterRequest } from 'src/shared/types/dto/auth/request/register.request';
import { RefreshTokenGuard } from 'src/common/guard/refresh-token.guard';
import { AuthenticatedRequest } from './auth.types';
import { RefreshTokenResponse } from 'src/shared/types/dto/auth/response/refresh-token.response';
import { RegisterResponse } from 'src/shared/types/dto/auth/response/register.response';

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

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.configService.get<number>('REFRESH_COOKIE_TIME') as number,
    });

    return responseWithoutRefresh;
  }

  //로컬 회원 가입으로 현재 구현 되어있음 추구 소셜 로그인 구현시 수정필요
  @Post('register')
  async localRegister(@Body() dto: RegisterRequest): Promise<RegisterResponse> {
    const res = await this.authService.register({
      provider: 'LOCAL',
      ...dto,
    });

    return { accessToken: res.accessToken, id: res.id };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.end();
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(
    @Req() request: AuthenticatedRequest,
  ): Promise<RefreshTokenResponse> {
    const userId = request.user.id;

    const accessToken = await this.authService.refreshAccessToken(userId);

    return { accessToken };
  }
}
