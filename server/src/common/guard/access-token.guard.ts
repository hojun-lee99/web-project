import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { userId?: string }>();

    const accessToken = this.extractAccessTokenFromHeader(req);

    const paylod = await this.verifyAccessToken(accessToken);

    req.userId = paylod.sub;

    return true;
  }

  private async verifyAccessToken(
    accessToken: string,
  ): Promise<{ sub: string }> {
    try {
      return await this.jwtService.verifyAsync(accessToken);
    } catch (e: unknown) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  private extractAccessTokenFromHeader(request: Request): string {
    const { authorization } = request.headers;
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    return authorization.split(' ')[1];
  }
}
