import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticle, CreateArticleDto, UpdateArticleDto } from './dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    //TODO 토큰 검증 수정
    const { title, content, access_tocken } = createArticleDto;
    const createArticle: CreateArticle = {
      title: title,
      content: content,
      authorId: Number(access_tocken),
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    //TODO 토큰 검증
    const { access_tocken, ...updateArticleData } = updateArticleDto;
    return await this.articlesService.update(updateArticleData);
  }

  //? 토큰 받아서 검증해야 할듯?
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.articlesService.remove(+id);
  }
}
