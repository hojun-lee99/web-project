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

  async readReviews(movieId: string, cursor?: string) {
    const reviews = await this.reviewsRepo.findManyByMovieId(movieId, cursor);

    if (!reviews) {
      return { reviews: [], nextCursor: null };
    }

    return reviews;
  }

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

    if (!existingReview) {
      await this.createReview(user.id, movieId, rating);
    } else {
      await this.updateReview({ id: existingReview.id, rating });
    }

    await this.updateAverageRating(movieId);
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
      ? await this.createReview(user.id, movieId, 0, comment)
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
    movieId: string,
    rating?: number,
    comment?: string,
  ) {
    const prototype: ReviewPrototype = {
      userId,
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

  async updateAverageRating(movieId: string) {
    const ratings = await this.reviewsRepo.findRatingsByMovieId(movieId);

    let averageRating = 0;
    if (ratings.length > 0 && ratings) {
      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      averageRating = Math.round((sum / ratings.length) * 10) / 10;
    }

    await this.moviesRepo.update(movieId, { averageRating: averageRating });
  }
}
