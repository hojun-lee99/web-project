export interface MovieInfo {
  readonly id: number;

  readonly averageRating: number;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export interface MoviePrototype {
  readonly id: number;

  readonly averageRating: number;
}

export interface RatingPrototype {
  readonly rating: number;
}
