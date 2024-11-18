import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticle, updateArticle } from './dto';

// TODO access 토큰 검증 메서드 작성
@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticle: CreateArticle) {
    return await this.prisma.article.create({
      data: createArticle,
    });
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.article.count(),
    ]);

    return {
      data: articles,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async update(updateArticle: updateArticle) {
    try {
      const { id, ...updateData } = updateArticle;
      return await this.prisma.article.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(
        `Article with Id ${updateArticle.id} not found`,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.article.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Article with Id ${id} not found`);
    }
  }
}
