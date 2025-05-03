import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AccessTokenGuard } from 'src/common/guard/access-token.guard';
import { CurrnetUser } from 'src/common/decorator/current-user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':reviewId')
  async deleteReview(
    @Param('reviewId') reviewId: string,
    @CurrnetUser() userId: string,
  ) {
    await this.reviewsService.deleteReview(userId, reviewId);
  }
}
