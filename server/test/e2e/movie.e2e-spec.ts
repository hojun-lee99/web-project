import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import { login } from 'test/helper/login';
import { CreateRatingDto } from 'src/shared/types/dto/movies/request/create-rating.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { WriteCommentDto } from 'src/shared/types/dto/movies/request/write-comment.request';
import { v4 } from 'uuid';
import { ResponseResult } from 'test/helper/types';
import { GetReviewsResponse } from 'src/shared/types/dto/movies/response/get-reviews.response';
import { RegisterResponse } from 'src/shared/types/dto/auth/response/register.response';

describe('MoviesController (e2e)', () => {
  let app: INestApplication<App>;
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

  describe('/movies/:movieId/ratings (POST)', () => {
    let accessToken: string;
    const testMovieId = '12345';

    beforeEach(async () => {
      await prisma.review.deleteMany();
      await prisma.movie.deleteMany();
      await prisma.user.deleteMany();
      const loginResult = await login(app);
      accessToken = loginResult.accessToken;
    });

    it('별점 생성 정상 작동', async () => {
      const ratingDto: CreateRatingDto = { rating: 8 };

      const response = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/ratings`)
        .set('Authorization', accessToken)
        .send(ratingDto);

      const { status } = response;

      expect(status).toBe(HttpStatus.NO_CONTENT);

      // 데이터베이스에서 생성된 리뷰 확인
      const reviewAfterCreate = await prisma.review.findFirst({
        where: { movieId: testMovieId },
      });
      const movieAfterCreate = await prisma.movie.findFirst({
        where: { id: testMovieId },
      });
      expect(reviewAfterCreate).toBeDefined(); // 리뷰가 존재하는지 확인
      expect(reviewAfterCreate?.rating).toBe(ratingDto.rating); // 별점이 올바르게 저장되었는지 확인
      expect(movieAfterCreate?.averageRating).toBe(ratingDto.rating);

      // 두 번째 요청: 별점 업데이트
      const updatedRatingDto: CreateRatingDto = { rating: 9 };
      const responseUpdate = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/ratings`)
        .set('Authorization', accessToken)
        .send(updatedRatingDto);

      // 응답 상태 코드 검증 (NO_CONTENT: 204)
      expect(responseUpdate.status).toBe(HttpStatus.NO_CONTENT);

      // 데이터베이스에서 업데이트된 리뷰 확인
      const reviewAfterUpdate = await prisma.review.findFirst({
        where: { movieId: testMovieId },
      });
      const movieAfterUpdate = await prisma.movie.findFirst({
        where: { id: testMovieId },
      });
      expect(reviewAfterUpdate).toBeDefined();
      expect(reviewAfterUpdate?.rating).toBe(updatedRatingDto.rating); // 별점이 올바르게 업데이트되었는지 확인
      expect(movieAfterUpdate?.averageRating).toBe(updatedRatingDto.rating);
    });

    it('평균 별점 계산 정상 작동', async () => {
      const response = (await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'user2@email.com',
          name: 'user2',
          password: 'password2',
        })) as ResponseResult<RegisterResponse>;

      const token2 = `Bearer ${response.body.accessToken}`;

      const res1 = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/ratings`)
        .set('Authorization', accessToken)
        .send({ rating: 4 });

      const res2 = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/ratings`)
        .set('Authorization', token2)
        .send({ rating: 2 });

      expect(res1.status).toBe(HttpStatus.NO_CONTENT);
      expect(res2.status).toBe(HttpStatus.NO_CONTENT);
      const movieData = await prisma.movie.findFirst({
        where: { id: testMovieId },
      });
      expect(movieData?.averageRating).toBe(3);
    });

    // 실패 케이스: 유효하지 않은 별점 값 (예: 범위 초과, 문자열 등)
    it('유효하지 않은 별점 값으로 요청 시 에러 발생 (HttpStatus.BAD_REQUEST)', async () => {
      const invalidRatingDto = { rating: 'invalid-rating' }; // 유효하지 않은 데이터 (문자열)

      const response = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/ratings`)
        .set('Authorization', accessToken)
        .send(invalidRatingDto); // 문자열 형태의 별점 전송

      // 응답 상태 코드 검증 (BAD_REQUEST: 400)
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    // 실패 케이스: 인증 토큰 누락
    it('인증 토큰 없이 요청 시 에러 발생 (HttpStatus.UNAUTHORIZED)', async () => {
      const ratingDto: CreateRatingDto = { rating: 7.0 };

      const response = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/ratings`)
        // .set('Authorization', accessToken) // 인증 헤더 누락
        .send(ratingDto);

      // 응답 상태 코드 검증 (UNAUTHORIZED: 401)
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });

    // 실패 케이스: 유효하지 않은 인증 토큰
    it('유효하지 않은 인증 토큰으로 요청 시 에러 발생 (HttpStatus.UNAUTHORIZED)', async () => {
      const ratingDto: CreateRatingDto = { rating: 7.5 };
      const invalidToken = 'Bearer invalid.token.string'; // 유효하지 않은 토큰

      const response = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/ratings`)
        .set('Authorization', invalidToken) // 유효하지 않은 토큰 설정
        .send(ratingDto);

      // 응답 상태 코드 검증 (UNAUTHORIZED: 401)
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  //* 별점과 기능이 동일해 정상 동작하는지만 확인, 추후 기능이 추가될 경우 테스트 필요
  describe('/movies/:movieId/reviews (POST)', () => {
    let accessToken: string;
    const testMovieId = '12345';

    beforeEach(async () => {
      await prisma.review.deleteMany();
      await prisma.movie.deleteMany();
      await prisma.user.deleteMany();
      const loginResult = await login(app);
      accessToken = loginResult.accessToken;
    });

    it('코멘트 작성 정상 동작', async () => {
      const commentDto: WriteCommentDto = {
        comment: '테스트를 위한 영화 한줄평 입니다.',
      };

      const response = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/comments`)
        .set('Authorization', accessToken)
        .send(commentDto);

      const { status } = response;

      expect(status).toBe(HttpStatus.NO_CONTENT);

      // 데이터베이스에서 생성된 리뷰 확인
      const reviewAfterCreate = await prisma.review.findFirst({
        where: { movieId: testMovieId },
      });
      expect(reviewAfterCreate).toBeDefined(); // 리뷰가 존재하는지 확인
      expect(reviewAfterCreate?.comment).toBe(commentDto.comment); // 코멘트가 올바르게 저장되었는지 확인

      // 두 번째 요청: 별점 업데이트
      const updatedCommentDto: WriteCommentDto = {
        comment: '테스트를 위한 영화 코멘트 업데이트 입니다.',
      };
      const responseUpdate = await request(app.getHttpServer())
        .post(`/movies/${testMovieId}/comments`)
        .set('Authorization', accessToken)
        .send(updatedCommentDto);

      // 응답 상태 코드 검증 (NO_CONTENT: 204)
      expect(responseUpdate.status).toBe(HttpStatus.NO_CONTENT);

      // 데이터베이스에서 업데이트된 리뷰 확인
      const reviewAfterUpdate = await prisma.review.findFirst({
        where: { movieId: testMovieId },
      });

      expect(reviewAfterUpdate).toBeDefined();
      expect(reviewAfterUpdate?.comment).toBe(updatedCommentDto.comment); // 코멘트가 올바르게 업데이트되었는지 확인
    });
  });

  describe('/movies/:movieId/reviews (GET)', () => {
    let userId: string;
    const testMovieId = '12345';

    beforeEach(async () => {
      await prisma.review.deleteMany();
      await prisma.movie.deleteMany();
      await prisma.user.deleteMany();
      const loginResult = await login(app);
      userId = loginResult.id;
    });

    const createReviews = async (
      movieId: string,
      userId: string,
      count: number,
    ) => {
      const reviewData = Array.from({ length: count }, (_, index) => ({
        id: v4(),
        comment: `Test comment ${index + 1}`,
        rating: 7 + index * 0.5,
        userId: userId,
        movieId: movieId,
        createdAt: new Date(Date.now() - (count - index) * 1000),
        updatedAt: new Date(Date.now() - (count - index) * 1000),
      }));

      await prisma.review.createMany({
        data: reviewData,
      });

      return reviewData.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    };

    it('첫 페이지 리뷰 조회 정상 동작 (No Cursor)', async () => {
      const reviewsToCreate = 5;

      const compareData = await createReviews(
        testMovieId,
        userId,
        reviewsToCreate,
      );

      const response = (await request(app.getHttpServer()).get(
        `/movies/${testMovieId}/reviews`,
      )) as ResponseResult<GetReviewsResponse>;

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.reviews).toHaveLength(reviewsToCreate);
      expect(response.body.reviews[0].comment).toContain(
        compareData[0].comment,
      );
      expect(response.body.nextCursor).toBeDefined();
      expect(response.body.nextCursor).not.toBeNull();
      expect(response.body.nextCursor).toBe('');
    });

    it('페이지 네이션 정상 동작', async () => {
      const reviewsToCreate = 15;

      const compareData = await createReviews(
        testMovieId,
        userId,
        reviewsToCreate,
      );

      const response = (await request(app.getHttpServer()).get(
        `/movies/${testMovieId}/reviews`,
      )) as ResponseResult<GetReviewsResponse>;

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.reviews).toHaveLength(10);
      expect(response.body.nextCursor).toBe(compareData[10].id);

      const nextResponse = (await request(app.getHttpServer()).get(
        `/movies/${testMovieId}/reviews?cursor=${response.body.nextCursor}`,
      )) as ResponseResult<GetReviewsResponse>;

      expect(nextResponse.status).toBe(HttpStatus.OK);
      expect(nextResponse.body.reviews).toHaveLength(5);
    });
  });
});
