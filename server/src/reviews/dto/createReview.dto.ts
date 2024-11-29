import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ContentType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: '이 영화는 정말 훌륭했습니다.',
    description: '리뷰 내용',
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'tt1375666',
    description: '컨텐츠 ID (외부 API)',
  })
  @IsString()
  @IsNotEmpty()
  contentId: string;

  @ApiProperty({
    enum: ContentType,
    example: 'MOVIE',
    description: '컨텐츠 타입',
  })
  @IsEnum(ContentType)
  contentType: ContentType;
}
