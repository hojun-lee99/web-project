import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateReviewParams,
  ReviewWithUser,
  UpdateReviewParams,
} from './types/review.type';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(params: CreateReviewParams): Promise<ReviewWithUser> {
    return this.prisma.review.create({
      data: params,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<ReviewWithUser[]> {
    return this.prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<ReviewWithUser> {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(
    id: number,
    userId: number,
    params: UpdateReviewParams,
  ): Promise<ReviewWithUser> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    if (review.userId !== userId) {
      throw new NotFoundException('You can only update your own review');
    }

    return this.prisma.review.update({
      where: { id },
      data: params,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number): Promise<void> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with Id ${id} not found`);
    }

    console.log(`review.userId: ${review.userId}, userId: ${userId}`);

    if (review.userId !== userId) {
      throw new NotFoundException('You can only delete your own review');
    }

    await this.prisma.review.delete({
      where: { id },
    });
  }

  async findByContentId(contentId: string): Promise<ReviewWithUser[]> {
    return this.prisma.review.findMany({
      where: { contentId },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  }
}
