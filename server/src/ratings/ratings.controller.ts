import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto, UpdateRatingDto } from './dto';
import { ContentType } from '@prisma/client';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create({
      userId: req.user.id,
      ...createRatingDto,
    });
  }

  @Get()
  findAll(@Request() req) {
    return this.ratingsService.findAll(req.user.id);
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Get('content/:contentId/:contentType')
  findByContent(
    @Param('contentId') contentId: string,
    @Param('contentType') contentType: ContentType,
  ) {
    return this.ratingsService.findByContent(contentId, contentType);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingsService.update({
      userId: req.user.id,
      id: +id,
      ...updateRatingDto,
    });
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.ratingsService.remove(req.user.id, +id);
  }
}
