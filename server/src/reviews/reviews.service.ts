import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async deleteReview(userId: string, reviewId: string) {
    const review = await this.reviewsRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }
    if (review.userId !== userId) {
      throw new ConflictException('리뷰 작성자가 아닙니다.');
    }

    await this.reviewsRepository.deleteReview(reviewId);
  }
}
