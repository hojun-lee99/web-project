import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ description: '게시글 제목' })
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  content: string;

  @ApiProperty({ description: '카테고리 ID' })
  categoryId: number;
}

export class CreateArticle {
  @ApiProperty({ description: '게시글 제목' })
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  content: string;

  @ApiProperty({ description: '카테고리 ID' })
  categoryId: number;

  @ApiProperty({ description: '작성자 ID' })
  authorId: number;
}
