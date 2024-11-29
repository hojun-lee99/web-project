import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class UpdateRatingDto {
  @ApiProperty({
    description: '수정할 평점 점수',
    minimum: 0,
    maximum: 5,
    example: 5,
  })
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;
}

export class UpdateRating {
  userId: number;
  id: number;
  score: number;
}
