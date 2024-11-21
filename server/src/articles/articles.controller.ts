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

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

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

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.articlesService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articlesService.findOne(+id);
  }

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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.articlesService.remove(+id, req.user.userId);
  }
}
