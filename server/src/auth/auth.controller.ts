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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiResponse({ status: 400, description: '잘못된 요청 데이터 형식' })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  //! 비밀번호 형식을 정하고 검증하는 부분이 추가로 필요함
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공', type: LoginResponse })
  @ApiResponse({ status: 404, description: '사용자가 존재하지 않음' })
  @ApiResponse({
    status: 409,
    description: '잘못된 비밀번호 | 소셜 로그인으로 이미 가입된 계정',
  })
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

  //! 로컬 회원 가입으로 현재 구현 되어있음 추구 소셜 로그인 구현시 수정필요
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '회원가입 성공',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 409,
    description: '같은 이메일로 이미 가입한 사용자가 존재함',
  })
  @Post('register')
  async localRegister(@Body() dto: RegisterRequest): Promise<RegisterResponse> {
    const res = await this.authService.register({
      provider: 'LOCAL',
      ...dto,
    });

    return res;
  }

  @ApiOperation({
    summary: '로그아웃',
    description: 'refresh 토큰을 제거한다',
  })
  @ApiResponse({ status: 204, description: '로그아웃 성공' })
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

  @ApiOperation({
    summary: 'access 토큰 재발급',
    description: 'refresh 토큰을 검증하여 access 토큰을 재발급 해준다',
  })
  @ApiResponse({
    status: 200,
    description: '토큰 재발급 성공',
    type: RefreshTokenResponse,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패 refresh 토큰이 없음',
  })
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
