import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PipeModule } from './common/pipe/pipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PipeModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
