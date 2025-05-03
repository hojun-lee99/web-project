import { IsOptional, IsString } from 'class-validator';

export class GetReviewsRequest {
  @IsOptional()
  @IsString()
  readonly cursor?: string;
}
