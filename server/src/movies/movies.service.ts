import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from 'src/movies/movies.repository';
import {
  CommentPrototype,
  MoviePrototype,
  RatingPrototype,
} from 'src/movies/types/movies.types';
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
    movieId: string,
    prototype: RatingPrototype,
  ) {
    const { rating } = prototype;

    const user = await this.usersRepo.findOneById(userId);
    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }

    const movie = await this.moviesRepo.findOneById(movieId);
    if (!movie) {
      await this.createMovie(movieId);
    }

    const existingReview = await this.reviewsRepo.findReviewByUserAndMovie(
      userId,
      movieId,
    );

    return !existingReview
      ? await this.createReview(user.id, user.name, movieId, rating)
      : await this.updateReview({ id: existingReview.id, rating });
  }

  async reviewComment(
    userId: string,
    movieId: string,
    prototype: CommentPrototype,
  ) {
    const { comment } = prototype;

    const user = await this.usersRepo.findOneById(userId);
    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }

    const movie = await this.moviesRepo.findOneById(movieId);
    if (!movie) {
      await this.createMovie(movieId);
    }

    const existingReview = await this.reviewsRepo.findReviewByUserAndMovie(
      userId,
      movieId,
    );

    return !existingReview
      ? await this.createReview(user.id, user.name, movieId, 0, comment)
      : await this.updateReview({ id: existingReview.id, comment });
  }

  private async createMovie(movieId: string) {
    const input: MoviePrototype = { id: movieId, averageRating: 0 };
    const stdDate = new Date();
    const movieEntity = MovieEntity.create(input, stdDate);
    await this.moviesRepo.save(movieEntity);
  }

  private async createReview(
    userId: string,
    name: string,
    movieId: string,
    rating?: number,
    comment?: string,
  ) {
    const prototype: ReviewPrototype = {
      userId,
      name,
      movieId,
      rating,
      comment,
    };

    const stdDate = new Date();
    const reviewEntity = ReviewEntity.create(prototype, v4, stdDate);
    await this.reviewsRepo.save(reviewEntity);
  }

  private async updateReview(existingReview: Partial<ReviewEntity>) {
    await this.reviewsRepo.updateReview(existingReview);
  }
}
