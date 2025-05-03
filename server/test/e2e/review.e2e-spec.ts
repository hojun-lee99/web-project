import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewEntity } from 'src/reviews/types/review.entity';
import { ReviewPrototype } from 'src/reviews/types/review.types';
import { login } from 'test/helper/login';
import { v4 } from 'uuid';

describe('ReviewController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await prisma.review.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('/reviews/:reviewId (DELETE)', () => {
    let accessToken: string;
    let userId: string;
    const movieId = '12345';

    beforeEach(async () => {
      const loginiResult = await login(app);
      accessToken = loginiResult.accessToken;
      userId = loginiResult.id;
    });

    const createReview = async (proto: ReviewPrototype) => {
      const review = ReviewEntity.create(proto, v4, new Date());
      return await prisma.review.create({
        data: review,
      });
    };

    it('리뷰 삭제 정상 작동', async () => {
      const reviewProto: ReviewPrototype = {
        userId,
        movieId,
        rating: 8,
        comment: '테스트 코멘트',
      };

      const createdData = await createReview(reviewProto);
      const { id } = createdData;

      const response = await request(app.getHttpServer())
        .delete(`/reviews/${id}`)
        .set('Authorization', accessToken);

      const { status } = response;

      expect(status).toBe(204);
    });

    it('리뷰 삭제 실패 (존재하지 않는 리뷰)', async () => {
      const nonExistentReviewId = v4();

      const response = await request(app.getHttpServer())
        .delete(`/reviews/${nonExistentReviewId}`)
        .set('Authorization', accessToken);

      const { status } = response;

      expect(status).toBe(HttpStatus.NOT_FOUND);
    });

    it('리뷰 삭제 실패 (권한 없음)', async () => {
      const reviewProto: ReviewPrototype = {
        userId: v4(),
        movieId,
        rating: 8,
        comment: '테스트 코멘트',
      };

      const createdData = await createReview(reviewProto);
      const { id } = createdData;

      const response = await request(app.getHttpServer())
        .delete(`/reviews/${id}`)
        .set('Authorization', accessToken);

      const { status } = response;

      expect(status).toBe(HttpStatus.CONFLICT);
    });
  });
});
