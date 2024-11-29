import { ContentType } from '@prisma/client';

export type CreateReviewParams = {
  content: string;
  contentId: string;
  contentType: ContentType;
  userId: number;
};

export type UpdateReviewParams = Partial<Omit<CreateReviewParams, 'userId'>>;

export type ReviewWithUser = {
  id: number;
  content: string;
  contentId: string;
  contentType: ContentType;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    nickname: string;
  };
};
