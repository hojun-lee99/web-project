import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from './types';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(article: Article) {
    return this.prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
        userId: article.authorId,
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

  async update(id: number, articleData: Partial<Article>) {
    const existingArticle = await this.findOne(id);

    if (existingArticle.userId !== articleData.authorId) {
      throw new ForbiddenException('You can only update your own articles');
    }

    return this.prisma.article.update({
      where: { id },
      data: {
        title: articleData.title,
        content: articleData.content,
      },
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
