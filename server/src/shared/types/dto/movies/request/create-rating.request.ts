import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateRatingRequest {
  @Type(() => Number)
  @IsNumber()
  readonly rating: number;
}
