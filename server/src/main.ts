import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './config/swagger/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
