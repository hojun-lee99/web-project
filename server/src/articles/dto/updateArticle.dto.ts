export class UpdateArticleDto {
  title?: string;
  content?: string;
}

export class UpdateArticle {
  id: number;
  title?: string;
  content?: string;
  userId: number;
}
