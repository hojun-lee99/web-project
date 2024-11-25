// update-article.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({ description: '수정할 게시글 제목' })
  title?: string;

  @ApiPropertyOptional({ description: '수정할 게시글 내용' })
  content?: string;
}

export class UpdatePost {
  @ApiProperty({ description: '게시글 ID' })
  id: number;

  @ApiPropertyOptional({ description: '수정할 게시글 제목' })
  title?: string;

  @ApiPropertyOptional({ description: '수정할 게시글 내용' })
  content?: string;

  @ApiProperty({ description: '사용자 ID' })
  userId: number;
}
