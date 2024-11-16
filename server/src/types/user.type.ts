// src/types/user.type.ts

export type User = {
  id: number;
  email: string;
  password: string;
  nickname: string;
  role: 'user' | 'admin'; // 리터럴 타입으로 지정
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

// DTO 타입들도 함께 정의
export type CreateUserDto = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
export type UserResponse = Omit<User, 'password'>;
