export class CreateArticleDto {
  title: string;
  content: string;
  categoryId: number;
}

export class CreateArticle {
  title: string;
  content: string;
  categoryId: number;
  authorId: number;
}
