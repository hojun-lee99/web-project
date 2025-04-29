export interface MovieInfo {
  readonly id: string;

  readonly averageRating: number;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export interface MoviePrototype {
  readonly id: string;

  readonly averageRating: number;
}

export interface RatingPrototype {
  readonly rating: number;
}

export interface CommentPrototype {
  readonly comment: string;
}
