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
import { LoginRequest } from 'shared/types/dto/auth/login.request';
import { Response } from 'express';
import { LoginResponse } from 'shared/types/dto/auth/login.response';
import { RegisterRequest } from 'shared/types/dto/auth/register.request';
import { RefreshTokenGuard } from 'src/common/guard/refresh-token.guard';
import { AuthenticatedRequest } from './auth.types';
import { RefreshTokenResponse } from 'shared/types/dto/auth/refresh-token.response';

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('register')
  async localRegister(@Body() dto: RegisterRequest) {
    await this.authService.register({ provider: 'LOCAL', ...dto });
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
  ): RefreshTokenResponse {
    const userId = request.user.id;

    const accessToken = await this.authService.refreshAccessToken(userId);

    return { accessToken };
  }
}
