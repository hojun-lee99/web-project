import { MoviePrototype } from './movies.types';

export class MovieEntity {
  constructor(
    readonly id: string,
    readonly averageRating: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  static create(
    input: MoviePrototype,
    stdDate: Date,
    updatedAt?: Date,
  ): MovieEntity {
    return new MovieEntity(
      input.id,
      input.averageRating,
      stdDate,
      updatedAt ? updatedAt : stdDate,
    );
  }
}
