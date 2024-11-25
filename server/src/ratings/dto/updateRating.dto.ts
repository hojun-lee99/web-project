import { IsInt, Max, Min } from 'class-validator';

export class UpdateRatingDto {
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
