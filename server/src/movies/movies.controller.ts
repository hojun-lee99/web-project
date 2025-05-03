import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { AccessTokenGuard } from 'src/common/guard/access-token.guard';
import { CurrnetUser } from 'src/common/decorator/current-user.decorator';
import { CreateRatingDto } from 'src/shared/types/dto/movies/request/create-rating.request';
import { WriteCommentDto } from 'src/shared/types/dto/movies/request/write-comment.request';
import { GetReviewsResponse } from 'src/shared/types/dto/movies/response/get-reviews.response';
import { GetReviewsRequest } from 'src/shared/types/dto/movies/request/get-reviews.request';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':movieId/ratings')
  async createRating(
    @Param('movieId') movieId: string,
    @Body() dto: CreateRatingDto,
    @CurrnetUser() userId: string,
  ) {
    await this.moviesService.reviewRating(userId, movieId, dto);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':movieId/comments')
  async writeComment(
    @Param('movieId') movieId: string,
    @Body() dto: WriteCommentDto,
    @CurrnetUser() userId: string,
  ) {
    await this.moviesService.reviewComment(userId, movieId, dto);
  }

  @Get(':movieId/reviews')
  async getReviews(
    @Param('movieId') movieId: string,
    @Query() dto: GetReviewsRequest,
  ): Promise<GetReviewsResponse> {
    const reviews = await this.moviesService.readReviews(movieId, dto.cursor);
    return {
      ...reviews,
      nextCursor: reviews.nextCursor ?? '',
    };
  }
}
