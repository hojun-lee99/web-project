import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComment, CreatePost, UpdateComment, UpdatePost } from './dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async findMainPosts() {
    const [recent, category0, category1, category2] = await Promise.all([
      this.prisma.post.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.post.findMany({
        where: {
          categoryId: 0,
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.post.findMany({
        where: {
          categoryId: 1,
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.post.findMany({
        where: {
          categoryId: 2,
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return {
      recent,
      category0,
      category1,
      category2,
    };
  }

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

  async createCommnet(createComment: CreateComment) {
    const { content, postId, userId, parentId } = createComment;
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with Id ${postId} not found`);
    }

    if (parentId) {
      const parentComment = await this.prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        throw new NotFoundException(
          `Parent comment with Id ${parentId} not found`,
        );
      }

      if (parentComment.parentId) {
        throw new BadRequestException(`Cannot reply to a nested comment`);
      }
    }

    return await this.prisma.comment.create({
      data: {
        content,
        postId,
        userId,
        parentId,
      },
    });
  }

  async findComments(
    postId: number,
    { page, limit }: { page: number; limit: number },
  ) {
    const skip = (page - 1) * limit;

    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const [comments, total] = await Promise.all([
      this.prisma.comment.findMany({
        where: {
          postId,
          OR: [{ parentId: null }, { parent: null }],
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  nickname: true,
                },
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      }),
      this.prisma.comment.count({
        where: { postId, OR: [{ parentId: null }, { parent: null }] },
      }),
    ]);

    return {
      data: comments,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateComment(updateComment: UpdateComment) {
    const { id, userId, content } = updateComment;
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      throw new NotFoundException(`Comment with Id ${id} not found`);
    }

    if (existingComment.userId !== userId) {
      throw new UnauthorizedException('You can only update your own comments');
    }

    return await this.prisma.comment.update({
      where: { id },
      data: { content },
    });
  }
  async removeComment(id: number, userId: number) {
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (existingComment.userId !== userId) {
      throw new UnauthorizedException('You can only delete your own comments');
    }

    return await this.prisma.comment.delete({
      where: { id },
    });
  }
}
