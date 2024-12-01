import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: '사용자 ID',
  })
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: '사용자 닉네임',
  })
  nickname: string;
}

export class ReviewResponseDto {
  @ApiProperty({
    example: 1,
    description: '리뷰 ID',
  })
  id: number;

  @ApiProperty({
    example: '이 영화는 정말 훌륭했습니다.',
    description: '리뷰 내용',
  })
  content: string;

  @ApiProperty({
    example: 'tt1375666',
    description: '컨텐츠 ID (외부 API)',
  })
  contentId: string;

  @ApiProperty({
    enum: ContentType,
    example: 'MOVIE',
    description: '컨텐츠 타입',
  })
  contentType: ContentType;

  @ApiProperty({
    example: 1,
    description: '작성자 ID',
  })
  userId: number;

  @ApiProperty({
    type: UserResponseDto,
    description: '작성자 정보',
  })
  user: UserResponseDto;

  @ApiProperty({
    example: '2024-03-15T09:00:00.000Z',
    description: '생성 일시',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-15T09:00:00.000Z',
    description: '수정 일시',
  })
  updatedAt: Date;
}
