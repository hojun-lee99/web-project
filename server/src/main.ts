// src/main.ts
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 명시적으로 .env 파일 경로 지정
dotenv.config({ path: resolve(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // 환경변수 로딩 확인
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in .env file');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Inflearn-project API')
    .setDescription('인프런 프로젝트를 위한 RESTful API')
    .setVersion('1.0')
    .addTag('Auth', '인증 관련 API')
    .addTag('Community', '커뮤니티 관련 API')
    .addTag('Ratings', '별점 관련 API')
    .addTag('Reviews', '리뷰 관련 API')
    .addTag('Articles', '아티클 관련 API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
