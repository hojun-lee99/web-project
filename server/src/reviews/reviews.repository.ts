import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewEntity } from './types/review.entity';
import {
  ReviewDataWithUserName,
  MappedReviewsResult,
  MappedReview,
} from './types/review.types';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: ReviewEntity): Promise<void> {
    await this.prisma.review.create({
      data,
    });
  }

  async findManyByMovieId(
    movieId: string,
    cursor?: string,
  ): Promise<MappedReviewsResult> {
    const limit = 10;
    const cursorOption = cursor ? { id: cursor } : undefined;

    const reviewsData = (await this.prisma.review.findMany({
      where: {
        movieId: movieId,
      },
      select: {
        id: true,
        comment: true,
        rating: true,
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
        movieId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ updatedAt: 'desc' }, { id: 'asc' }],
      take: limit + 1,
      cursor: cursorOption,
    })) as ReviewDataWithUserName[];

    let nextCursor: string | null = null;
    if (reviewsData.length > limit) {
      const nextItem = reviewsData.pop();
      nextCursor = nextItem?.id ?? null;
    }

    const reviews: MappedReview[] = reviewsData.map((review) => ({
      id: review.id,
      comment: review.comment,
      rating: review.rating,
      userId: review.userId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      userName: review.user.name,
    }));

    return { reviews, nextCursor };
  }

  async updateReview(data: Partial<ReviewEntity>): Promise<void> {
    await this.prisma.review.update({
      where: {
        id: data.id,
      },
      data: data,
    });
  }

  async findReviewByUserAndMovie(userId: string, movieId: string) {
    return this.prisma.review.findFirst({
      where: {
        userId,
        movieId,
      },
    });
  }
}
