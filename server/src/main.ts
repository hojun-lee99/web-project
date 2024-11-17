// src/main.ts
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 명시적으로 .env 파일 경로 지정
dotenv.config({ path: resolve(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 환경변수 로딩 확인
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in .env file');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
