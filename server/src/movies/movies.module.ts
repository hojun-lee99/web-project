import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, ReviewsModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesRepository],
})
export class MoviesModule {}
