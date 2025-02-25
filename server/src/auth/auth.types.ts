import { Request } from 'express';

export interface LocalLoginPrototype {
  readonly email: string;

  readonly password: string;
}

export interface JwtPayload {
  sub: string;
  iat?: string;
  exp?: string;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export type Provider = 'LOCAL' | 'KAKAO';
