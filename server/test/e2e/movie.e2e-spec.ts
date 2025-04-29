import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import { login } from 'test/helper/login';
import { CreateRatingDto } from 'src/shared/types/dto/movies/request/create-rating.request';
import { PrismaService } from 'src/prisma/prisma.service';

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
      const ratingDto: CreateRatingDto = { rating: 8.5 };

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
      expect(reviewAfterCreate).toBeDefined(); // 리뷰가 존재하는지 확인
      expect(reviewAfterCreate?.rating).toBe(ratingDto.rating); // 별점이 올바르게 저장되었는지 확인

      // 두 번째 요청: 별점 업데이트
      const updatedRatingDto: CreateRatingDto = { rating: 9.0 };
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

      expect(reviewAfterUpdate).toBeDefined();
      expect(reviewAfterUpdate?.rating).toBe(updatedRatingDto.rating); // 별점이 올바르게 업데이트되었는지 확인
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
});
