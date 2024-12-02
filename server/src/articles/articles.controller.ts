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

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createArticleDte: CreateArticleDto) {
    const article: Article = {
      title: createArticleDte.title,
      content: createArticleDte.content,
      authorId: req.user.userId,
    };
    return this.articlesService.create(article);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.articlesService.remove(+id, req.user.userId);
  }
}
