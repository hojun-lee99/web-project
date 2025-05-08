import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WriteCommentRequest {
  @ApiProperty({
    example: '이 영화 정말 재밌어요',
    description: '영화 한줄평',
  })
  @IsString()
  readonly comment: string;
}
