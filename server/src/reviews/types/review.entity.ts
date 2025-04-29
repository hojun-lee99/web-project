import { ReviewPrototype } from './review.types';

export class ReviewEntity {
  constructor(
    readonly id: string,
    readonly comment: string | null,
    readonly rating: number | null,
    readonly userId: string,
    readonly name: string,
    readonly movieId: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  static create(
    input: ReviewPrototype,
    idGen: () => string,
    stdDate: Date,
    updatedAt?: Date,
  ): ReviewEntity {
    return new ReviewEntity(
      idGen(),
      input.comment ?? '',
      input.rating ?? 0,
      input.userId,
      input.name,
      input.movieId,
      stdDate,
      updatedAt ?? stdDate,
    );
  }
}
