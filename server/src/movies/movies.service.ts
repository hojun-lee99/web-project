import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from 'src/movies/movies.repository';
import { MoviePrototype, RatingPrototype } from 'src/movies/types/movies.types';
import { MovieEntity } from './types/movie.entity';
import { ReviewsRepository } from 'src/reviews/reviews.repository';
import { UsersRepository } from 'src/users/users.repository';
import { ReviewPrototype } from 'src/reviews/types/review.types';
import { ReviewEntity } from 'src/reviews/types/review.entity';
import { v4 } from 'uuid';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepo: MoviesRepository,
    private readonly reviewsRepo: ReviewsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async reviewRating(
    userId: string,
    movieId: number,
    prototype: RatingPrototype,
  ) {
    const { rating } = prototype;
    const movie = await this.moviesRepo.findOneById(movieId);
    const user = await this.usersRepo.findOneById(userId);

    if (!movie) {
      await this.createMovie(movieId);
    }
    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }

    const existingReview = await this.reviewsRepo.findReviewByUserAndMovie(
      userId,
      movieId,
    );

    if (!existingReview) {
      await this.createReview(rating, user.id, user.name, movieId);
    } else {
      existingReview.rating = rating;
      await this.updateReview(existingReview);
    }
  }

  private async createMovie(movieId: number) {
    const input: MoviePrototype = { id: movieId, averageRating: 0 };
    const stdDate = new Date();
    const movieEntity = MovieEntity.create(input, stdDate);
    await this.moviesRepo.save(movieEntity);
  }

  private async createReview(
    rating: number,
    userId: string,
    name: string,
    movieId: number,
  ) {
    const prototype: ReviewPrototype = {
      rating,
      userId,
      name,
      movieId,
    };

    const stdDate = new Date();
    const reviewEntity = ReviewEntity.create(prototype, v4, stdDate);
    await this.reviewsRepo.save(reviewEntity);
  }

  private async updateReview(existingReview: Partial<ReviewEntity>) {
    await this.reviewsRepo.updateReview(existingReview);
  }
}
