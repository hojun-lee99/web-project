export class CreateCommentDto {
  content: string;
  postId: number;
}

export class CreateComment {
  content: string;
  postId: number;
  userId: number;
}
