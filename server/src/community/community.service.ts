import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePost, UpdatePost } from './dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(createPost: CreatePost) {
    return await this.prisma.post.create({
      data: createPost,
    });
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.post.count(),
    ]);

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(updatePost: UpdatePost) {
    const { id, userId, ...updateData } = updatePost;

    const existingPost = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with Id ${id} not found`);
    }

    if (existingPost.userId !== userId) {
      throw new UnauthorizedException('You can only update your own posts');
    }

    return await this.prisma.post.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number, userId: number) {
    const existingPost = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with Id ${id} not found`);
    }

    if (existingPost.userId !== userId) {
      throw new UnauthorizedException('You can only delete your own post');
    }

    return await this.prisma.post.delete({
      where: { id },
    });
  }
}
