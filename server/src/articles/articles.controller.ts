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
import { ArticlesService } from './articles.service';
import { CreateArticle, CreateArticleDto, UpdateArticleDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: '게시글 생성' })
  @ApiResponse({
    status: 201,
    description: '게시글이 성공적으로 생성됨',
    type: CreateArticle,
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createArticleDto: CreateArticleDto) {
    const { title, content, categoryId } = createArticleDto;
    const createArticle: CreateArticle = {
      title: title,
      content: content,
      categoryId: categoryId,
      authorId: req.user.userId,
    };
    return this.articlesService.create(createArticle);
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
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/CreateArticle' },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.articlesService.findAll({ page, limit });
  }

  @ApiOperation({ summary: '특정 게시글 조회' })
  @ApiParam({ name: 'id', description: '게시글 ID' })
  @ApiResponse({
    status: 200,
    description: '게시글 조회 성공',
    type: CreateArticle,
  })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articlesService.findOne(+id);
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({ name: 'id', description: '게시글 ID' })
  @ApiResponse({
    status: 200,
    description: '게시글 수정 성공',
    type: CreateArticle,
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 요청' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update({
      ...updateArticleDto,
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
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.articlesService.remove(+id, req.user.userId);
  }
}
