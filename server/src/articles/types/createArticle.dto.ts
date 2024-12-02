import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    description: '아티클 제목',
    example: '안녕하세요 아티클입니다.',
  })
  title: string;

  @ApiProperty({
    description: '아티클 내용',
    example: '아티클 내용 예시입니다.',
  })
  content: string;
}
