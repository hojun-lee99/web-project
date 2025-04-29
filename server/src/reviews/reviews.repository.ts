import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewEntity } from './types/review.entity';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: ReviewEntity): Promise<void> {
    await this.prisma.review.create({
      data,
    });
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
