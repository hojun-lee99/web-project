import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetReviewsRequest {
  @ApiProperty({
    nullable: true,
    example: 'd0e847af-21e7-413d-ae46-d07277f46a08',
    description: '페이지네이션을 위한 다음 커서 (UUID V4)',
  })
  @IsOptional()
  @IsString()
  readonly cursor?: string;
}
