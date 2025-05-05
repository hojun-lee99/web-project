import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ResponseResult } from './types';
import { RegisterRequest } from 'src/shared/types/dto/auth/request/register.request';
import { RegisterResponse } from 'src/shared/types/dto/auth/response/register.response';

export const login = async (app: INestApplication) => {
  const dto: RegisterRequest = {
    email: 'test@email.com',
    name: '테스트',
    password: '테스트',
  };

  const response = await request(app.getHttpServer())
    .post('/auth/register')
    .send(dto);
  const { body } = response as ResponseResult<RegisterResponse>;

  if (!body?.accessToken) {
    throw new Error('Login failed: No access token returned');
  }

  return {
    accessToken: `Bearer ${body.accessToken}`,
    id: body.id,
  };
};
