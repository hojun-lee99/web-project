import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { AccessTokenGuard } from 'src/common/guard/access-token.guard';
import { CurrnetUser } from 'src/common/decorator/current-user.decorator';
import { CreateRatingDto } from 'src/shared/types/dto/movies/request/create-rating.request';

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
    await this.moviesService.reviewRating(userId, parseInt(movieId), dto);
  }
}
