export class CreateCommentDto {
  content: string;
  postId: number;
  parentId?: number;
}

export class CreateComment {
  content: string;
  postId: number;
  userId: number;
  parentId?: number;
}
