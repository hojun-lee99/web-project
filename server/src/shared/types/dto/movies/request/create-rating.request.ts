import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @Type(() => Number)
  @IsNumber()
  readonly rating: number;
}
