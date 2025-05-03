export class ReviewResponse {
  readonly id: string;
  readonly comment: string | null;
  readonly rating: number | null;
  readonly userId: string;
  readonly userName: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class GetReviewsResponse {
  readonly reviews: ReviewResponse[];
  readonly nextCursor: string;
}
