export interface ReviewPrototype {
  readonly userId: string;

  readonly name: string;

  readonly movieId: string;

  readonly rating?: number;

  readonly comment?: string;
}
