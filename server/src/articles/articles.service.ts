import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './types';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createArticleDte: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        ...createArticleDte,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.article.findMany({
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
    const article = await this.prisma.article.findUnique({
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

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return article;
  }

  async update(id: number, userId: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id);

    if (article.userId !== userId) {
      throw new ForbiddenException('You can only update your own articles');
    }

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number, userId: number) {
    const article = await this.findOne(id);

    if (article.userId !== userId) {
      throw new ForbiddenException('You can only delete your own articles');
    }

    return this.prisma.article.delete({
      where: { id },
    });
  }
}
