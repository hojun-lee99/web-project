import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponse {
  @ApiProperty({
    description: '리뷰의 고유 ID',
    example: 'b7a3c0f8-1e9d-4c7a-8f0e-7b3d1c9a0f3e',
  })
  readonly id: string;
  @ApiProperty({
    description: '리뷰 내용',
    example: '정말 좋은 상품입니다!',
    nullable: true,
  })
  readonly comment: string | null;
  @ApiProperty({
    description: '평점 (0-10)',
    example: 5,
    nullable: true,
  })
  readonly rating: number | null;
  @ApiProperty({
    description: '리뷰 작성자 고유 ID',
    example: 'd0e847af-21e7-413d-ae46-d07277f46a08',
  })
  readonly userId: string;
  @ApiProperty({ description: '리뷰 작성자 이름', example: '홍길동' })
  readonly userName: string;
  @ApiProperty({
    description: '리뷰 생성 일시',
    example: '2024-05-07T12:34:56.789Z',
  })
  readonly createdAt: Date;
  @ApiProperty({
    description: '리뷰 마지막 수정 일시',
    example: '2024-05-07T12:35:00.123Z',
  })
  readonly updatedAt: Date;
}

export class GetReviewsResponse {
  @ApiProperty({
    isArray: true,
    type: () => ReviewResponse,
    description: '리뷰 목록 배열 (10개씩 조회)',
  })
  readonly reviews: ReviewResponse[];

  @ApiProperty({
    nullable: true,
    example: 'd0e847af-21e7-413d-ae46-d07277f46a08',
    description: '페이지네이션을 위한 다음 커서 (UUID V4)',
  })
  readonly nextCursor: string | null;
}
