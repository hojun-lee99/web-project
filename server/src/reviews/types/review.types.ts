export interface ReviewPrototype {
  readonly userId: string;

  readonly movieId: string;

  readonly rating?: number;

  readonly comment?: string;
}

export interface ReviewInfo {
  readonly id: string;

  readonly comment: string | null;

  readonly rating: number | null;

  readonly userId: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export interface ReviewDataWithUserName extends ReviewInfo {
  user: {
    name: string;
  };
}

export interface MappedReview extends ReviewInfo {
  userName: string;
}

export interface MappedReviewsResult {
  reviews: MappedReview[];
  nextCursor: string | null;
}
