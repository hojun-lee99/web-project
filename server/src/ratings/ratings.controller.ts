import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContentType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { RatingsService } from './ratings.service';
import {
  CreateRatingDto,
  UpdateRatingDto,
  RatingResponseDto,
  RatingWithUserResponseDto,
} from './dto';

@ApiTags('Ratings')
@ApiBearerAuth()
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @ApiOperation({
    summary: '평점 생성',
    description: '컨텐츠에 대한 새로운 평점을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '평점이 성공적으로 생성되었습니다.',
    type: RatingResponseDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create({
      userId: req.user.userId,
      ...createRatingDto,
    });
  }

  @ApiOperation({
    summary: '사용자의 모든 평점 조회',
    description: '현재 로그인한 사용자의 모든 평점을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '평점 목록 조회 성공',
    type: [RatingWithUserResponseDto],
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.ratingsService.findAll(req.user.userId);
  }

  @ApiOperation({
    summary: '특정 평점 조회',
    description: '특정 ID의 평점을 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '평점 ID' })
  @ApiResponse({
    status: 200,
    description: '평점 조회 성공',
    type: RatingResponseDto,
  })
  @ApiResponse({ status: 404, description: '평점을 찾을 수 없습니다.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @ApiOperation({
    summary: '컨텐츠별 평점 조회',
    description: '특정 컨텐츠의 모든 평점을 조회합니다.',
  })
  @ApiParam({ name: 'contentId', description: '컨텐츠 ID' })
  @ApiParam({
    name: 'contentType',
    enum: ContentType,
    description: '컨텐츠 타입',
  })
  @ApiResponse({
    status: 200,
    description: '컨텐츠 평점 조회 성공',
    type: [RatingWithUserResponseDto],
  })
  @Get('content/:contentId/:contentType')
  findByContent(
    @Param('contentId') contentId: string,
    @Param('contentType') contentType: ContentType,
  ) {
    return this.ratingsService.findByContent(contentId, contentType);
  }

  @ApiOperation({
    summary: '평점 수정',
    description: '특정 평점을 수정합니다.',
  })
  @ApiParam({ name: 'id', description: '평점 ID' })
  @ApiResponse({
    status: 200,
    description: '평점 수정 성공',
    type: RatingResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: '다른 사용자의 평점은 수정할 수 없습니다.',
  })
  @ApiResponse({ status: 404, description: '평점을 찾을 수 없습니다.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingsService.update({
      userId: req.user.userId,
      id: +id,
      ...updateRatingDto,
    });
  }

  @ApiOperation({
    summary: '평점 삭제',
    description: '특정 평점을 삭제합니다.',
  })
  @ApiParam({ name: 'id', description: '평점 ID' })
  @ApiResponse({
    status: 200,
    description: '평점 삭제 성공',
    type: RatingResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: '다른 사용자의 평점은 삭제할 수 없습니다.',
  })
  @ApiResponse({ status: 404, description: '평점을 찾을 수 없습니다.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.ratingsService.remove(req.user.userId, +id);
  }
}
