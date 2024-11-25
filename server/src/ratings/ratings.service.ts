import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRating, UpdateRating } from './dto';
import { ContentType, Prisma } from '@prisma/client';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async create(createRating: CreateRating) {
    try {
      return await this.prisma.rating.create({
        data: createRating,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return await this.prisma.rating.update({
            where: {
              userId_contentId_contentType: {
                userId: createRating.userId,
                contentId: createRating.contentId,
                contentType: createRating.contentType,
              },
            },
            data: {
              score: createRating.score,
            },
          });
        }
      }
      throw error;
    }
  }

  async findAll(userId: number) {
    return await this.prisma.rating.findMany({
      where: {
        userId,
      },
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

  async findOne(id: number) {
    const rating = await this.prisma.rating.findUnique({
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

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    return rating;
  }

  async findByContent(contentId: string, contentType: ContentType) {
    return await this.prisma.rating.findMany({
      where: {
        contentId,
        contentType,
      },
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

  async update(updateRating: UpdateRating) {
    const { id, userId, score } = updateRating;
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with Id ${id} not found`);
    }

    if (rating.userId !== userId) {
      throw new ForbiddenException(`Cannot modify other user's rating`);
    }

    return await this.prisma.rating.update({
      where: { id },
      data: { score },
    });
  }

  async remove(userId: number, id: number) {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    if (rating.userId !== userId) {
      throw new ForbiddenException(`Cannot delete other user's rating`);
    }

    return await this.prisma.rating.delete({
      where: { id },
    });
  }
}
