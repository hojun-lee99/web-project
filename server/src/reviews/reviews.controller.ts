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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Reviews')
@ApiResponse({ status: 400, description: '잘못된 요청 데이터 형식' })
@ApiResponse({ status: 401, description: '인증 실패' })
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  //? pram을 movieId로 받으면 userId랑 리뷰 작성자를 검증하는 로직이 없어짐
  @ApiOperation({ summary: '리뷰 삭제' })
  @ApiParam({ name: 'reviewId', type: String, description: '리뷰 ID' })
  @ApiResponse({ status: 204, description: '리뷰 삭제 성공' })
  @ApiResponse({
    status: 404,
    description: 'ID에 해당하는 리뷰를 찾을 수 없음',
  })
  @ApiResponse({
    status: 409,
    description: '리뷰 작성자와 userId가 일치하지 않음',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':reviewId')
  async deleteReview(
    @Param('reviewId') reviewId: string,
    @CurrnetUser() userId: string,
  ) {
    await this.reviewsService.deleteReview(userId, reviewId);
  }
}
