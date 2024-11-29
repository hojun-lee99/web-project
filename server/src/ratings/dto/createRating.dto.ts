import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({
    description: '평점 점수',
    minimum: 0,
    maximum: 5,
    example: 4,
  })
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @ApiProperty({
    description: '컨텐츠 ID',
    example: 'movie-123',
  })
  @IsString()
  contentId: string;

  @ApiProperty({
    description: '컨텐츠 타입',
    enum: ContentType,
    example: 'MOVIE',
  })
  @IsEnum(ContentType)
  contentType: ContentType;
}

export class CreateRating {
  score: number;
  contentId: string;
  contentType: ContentType;
  userId: number;
}
