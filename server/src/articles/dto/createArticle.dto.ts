// TODO DTO 수정 필요
export class CreateArticleDto {
  title: string;
  content: string;
  access_tocken: string;
}

export class CreateArticle {
  title: string;
  content: string;
  authorId: number;
}
