import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import {
  CreateCommentDto,
  CreatePost,
  CreatePostDto,
  UpdateCommentDto,
  UpdatePostDto,
} from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @ApiOperation({ summary: '메이 페이지 게시글 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '메인 페이지 게시글 목록 조회 성공',
    schema: {
      example: {
        recent: [
          {
            id: 1,
            title: 'Recent post',
            content: 'Content',
            userId: 1,
            categoryId: 0,
            createdAt: '2024-11-23T08:01:12.975Z',
            updatedAt: '2024-11-23T08:01:12.975Z',
          },
        ],
        category0: [
          {
            id: 2,
            title: 'Category 0 post',
            content: 'Content',
            userId: 1,
            categoryId: 0,
            createdAt: '2024-11-23T08:01:12.975Z',
            updatedAt: '2024-11-23T08:01:12.975Z',
          },
        ],
        category1: [], // Similar structure
        category2: [], // Similar structure
      },
    },
  })
  @Get()
  async find() {
    return await this.communityService.findMainPosts();
  }

  /**       개시글 CRUD          */
  @ApiOperation({ summary: '게시글 생성' })
  @ApiResponse({
    status: 201,
    description: '게시글이 성공적으로 생성됨',
    schema: {
      example: {
        id: 2,
        title: 'string',
        content: 'string',
        userId: 1,
        categoryId: 0,
        createdAt: '2024-11-23T08:01:12.975Z',
        updatedAt: '2024-11-23T08:01:12.975Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('post')
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const { title, content, categoryId } = createPostDto;
    const createPost: CreatePost = {
      title: title,
      content: content,
      categoryId: categoryId,
      userId: req.user.userId,
    };
    return this.communityService.create(createPost);
  }

  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '페이지당 게시글 수 (기본값: 10)',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 목록 조회 성공',
    schema: {
      example: {
        data: [
          {
            id: 2,
            title: 'string',
            content: 'string',
            userId: 1,
            categoryId: 0,
            createdAt: '2024-11-23T08:01:12.975Z',
            updatedAt: '2024-11-23T08:01:12.975Z',
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      },
    },
  })
  @Get('post')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.communityService.findAll({ page, limit });
  }

  @ApiOperation({ summary: '특정 게시글 조회' })
  @ApiParam({ name: 'id', description: '게시글 ID' })
  @ApiResponse({
    status: 200,
    description: '게시글 조회 성공',
    schema: {
      example: {
        id: 2,
        title: 'string',
        content: 'string',
        userId: 1,
        categoryId: 0,
        createdAt: '2024-11-23T08:01:12.975Z',
        updatedAt: '2024-11-23T08:01:12.975Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  @Get('post:id')
  async findOne(@Param('id') id: string) {
    return await this.communityService.findOne(+id);
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({ name: 'id', description: '게시글 ID' })
  @ApiResponse({
    status: 200,
    description: '게시글 수정 성공',
    schema: {
      example: {
        id: 2,
        title: 'string123',
        content: 'string123',
        userId: 1,
        categoryId: 0,
        createdAt: '2024-11-23T08:01:12.975Z',
        updatedAt: '2024-11-23T08:11:54.173Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('post:id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.communityService.update({
      ...updatePostDto,
      id: +id,
      userId: req.user.userId,
    });
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({ name: 'id', description: '게시글 ID' })
  @ApiResponse({ status: 200, description: '게시글 삭제 성공' })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('post:id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.communityService.remove(+id, req.user.userId);
  }

  /**         댓글 CRUD          */
  @ApiOperation({ summary: '댓글 생성' })
  @ApiResponse({
    status: 201,
    description: '댓글이 성공적으로 생성됨',
    schema: {
      example: {
        id: 1,
        content: 'string',
        postId: 1,
        userId: 1,
        createdAt: '2024-11-23T08:01:12.975Z',
        updatedAt: '2024-11-23T08:01:12.975Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('comment')
  async createComment(
    @Request() req,
    @Body() createCommentDte: CreateCommentDto,
  ) {
    return await this.communityService.createCommnet({
      ...createCommentDte,
      userId: req.user.userId,
    });
  }
  @ApiOperation({ summary: '게시글의 댓글 목록 조회' })
  @ApiParam({ name: 'postId', description: '게시글 ID' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 1)',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 목록 조회 성공',
    schema: {
      example: {
        data: [
          {
            id: 1,
            content: 'string',
            postId: 1,
            userId: 1,
            createdAt: '2024-11-23T08:01:12.975Z',
            updatedAt: '2024-11-23T08:01:12.975Z',
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      },
    },
  })
  @Get('post/:postId/comments')
  async findComments(
    @Param('postId') postId: string,
    @Query('page') page: number = 1,
  ) {
    const limit = 10; // 고정된 limit 값
    return await this.communityService.findComments(+postId, { page, limit });
  }

  @ApiOperation({ summary: '댓글 수정' })
  @ApiParam({ name: 'id', description: '댓글 ID' })
  @ApiResponse({
    status: 200,
    description: '댓글 수정 성공',
    schema: {
      example: {
        id: 1,
        content: 'updated string',
        postId: 1,
        userId: 1,
        createdAt: '2024-11-23T08:01:12.975Z',
        updatedAt: '2024-11-23T08:11:54.173Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '댓글을 찾을 수 없음' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('comment/:id')
  async updateComment(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.communityService.updateComment({
      id: +id,
      userId: req.user.userId,
      content: updateCommentDto.content,
    });
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @ApiParam({ name: 'id', description: '댓글 ID' })
  @ApiResponse({ status: 200, description: '댓글 삭제 성공' })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '댓글을 찾을 수 없음' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('comment/:id')
  async removeComment(@Request() req, @Param('id') id: string) {
    return await this.communityService.removeComment(+id, req.user.userId);
  }
}
