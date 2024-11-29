import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

class UserResponseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '사용자 닉네임',
    example: 'test1',
  })
  nickname: string;
}

export class RatingResponseDto {
  @ApiProperty({
    description: '평점 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '평점 점수',
    minimum: 0,
    maximum: 5,
    example: 5,
  })
  score: number;

  @ApiProperty({
    description: '컨텐츠 ID',
    example: 'movie-123',
  })
  contentId: string;

  @ApiProperty({
    description: '컨텐츠 타입',
    enum: ContentType,
    example: 'MOVIE',
  })
  contentType: ContentType;

  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: '생성 일시',
    example: '2024-11-29T22:22:45.610Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정 일시',
    example: '2024-11-29T22:24:53.155Z',
  })
  updatedAt: Date;
}

export class RatingWithUserResponseDto {
  @ApiProperty({
    description: '평점 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '평점 점수',
    minimum: 0,
    maximum: 5,
    example: 4,
  })
  score: number;

  @ApiProperty({
    description: '컨텐츠 ID',
    example: 'movie-123',
  })
  contentId: string;

  @ApiProperty({
    description: '컨텐츠 타입',
    enum: ContentType,
    example: 'MOVIE',
  })
  contentType: ContentType;

  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: '생성 일시',
    example: '2024-11-29T22:22:45.610Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정 일시',
    example: '2024-11-29T22:22:45.610Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '사용자 정보',
    type: UserResponseDto,
  })
  user: UserResponseDto;
}
