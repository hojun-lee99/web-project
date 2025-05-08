import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateRatingRequest {
  @ApiProperty({ example: 8, description: '별점은 0 ~ 10 사이의 정수' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  readonly rating: number;
}
