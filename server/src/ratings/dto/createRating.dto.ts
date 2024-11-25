import { ContentType } from '@prisma/client';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @IsString()
  contentId: string;

  @IsEnum(ContentType)
  contentType: ContentType;
}

export class CreateRating {
  score: number;
  contentId: string;
  contentType: ContentType;
  userId: number;
}
