import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Article, CreateArticleDto, UpdateArticleDto } from './types/index';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '아티클 작성' })
  @ApiResponse({
    status: 201,
    description: '아티클이 성공적으로 작성되었습니다.',
    type: CreateArticleDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 요청',
  })
  create(@Req() req, @Body() createArticleDte: CreateArticleDto) {
    const article: Article = {
      title: createArticleDte.title,
      content: createArticleDte.content,
      authorId: req.user.userId,
    };
    return this.articlesService.create(article);
  }

  @Get()
  @ApiOperation({ summary: '아티클 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '아티클 목록을 성공적으로 조회했습니다.',
    type: [CreateArticleDto],
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '아티클 상세 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '아티클 ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '아티클을 성공적으로 조회했습니다.',
    type: CreateArticleDto,
  })
  @ApiResponse({ status: 404, description: '아티클을 찾을 수 없습니다.' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '아티클 수정' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '아티클 ID',
    type: Number,
  })
  @ApiResponse({
    status: 201,
    description: '아티클이 성공적으로 수정되었습니다.',
    type: UpdateArticleDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 요청(토큰 인증 에러)',
  })
  @ApiResponse({
    status: 403,
    description: '자신의 아티클만 수정할 수 있습니다.',
  })
  @ApiResponse({ status: 404, description: '아티클을 찾을 수 없습니다.' })
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article: Partial<Article> = {
      ...(updateArticleDto.title && { title: updateArticleDto.title }),
      ...(updateArticleDto.content && { content: updateArticleDto.content }),
      authorId: req.user.userId,
    };
    return this.articlesService.update(+id, article);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '아티클 삭제' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '아티클 ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '아티클이 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 요청(토큰 인증 에러)',
  })
  @ApiResponse({
    status: 403,
    description: '자신의 아티클만 삭제할 수 있습니다.',
  })
  @ApiResponse({ status: 404, description: '아티클을 찾을 수 없습니다.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.articlesService.remove(+id, req.user.userId);
  }
}
