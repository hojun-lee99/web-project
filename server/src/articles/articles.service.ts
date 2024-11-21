import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticle, UpdateArticle } from './dto';

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

  async update(updateArticle: UpdateArticle) {
    const { id, userId, ...updateData } = updateArticle;

    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new NotFoundException(`Article with Id ${id} not found`);
    }

    if (existingArticle.authorId !== userId) {
      throw new UnauthorizedException('You can only update your own articles');
    }

    return await this.prisma.article.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number, userId: number) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new NotFoundException(`Article with Id ${id} not found`);
    }

    if (existingArticle.authorId !== userId) {
      throw new UnauthorizedException('You can only delete your own article');
    }

    return await this.prisma.article.delete({
      where: { id },
    });
  }
}
