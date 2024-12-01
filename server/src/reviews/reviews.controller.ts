import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
} from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateReviewDto, ReviewResponseDto, UpdateReviewDto } from './dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: '리뷰 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '리뷰가 성공적으로 생성되었습니다.',
    type: ReviewResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create({
      ...createReviewDto,
      userId: req.user.userId,
    });
  }

  @ApiOperation({ summary: '전체 리뷰 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '전체 리뷰 목록을 반환합니다.',
    type: [ReviewResponseDto],
  })
  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @ApiOperation({ summary: '특정 리뷰 조회' })
  @ApiParam({
    name: 'id',
    description: '리뷰 ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 리뷰를 반환합니다.',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '리뷰를 찾을 수 없습니다.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @ApiOperation({ summary: '컨텐츠별 리뷰 조회' })
  @ApiParam({
    name: 'contentId',
    description: '컨텐츠 ID',
    example: 'tt1375666',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '해당 컨텐츠의 리뷰 목록을 반환합니다.',
    type: [ReviewResponseDto],
  })
  @Get('content/:contentId')
  findByContentId(@Param('contentId') contentId: string) {
    return this.reviewsService.findByContentId(contentId);
  }

  @ApiOperation({ summary: '리뷰 수정' })
  @ApiParam({
    name: 'id',
    description: '리뷰 ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '리뷰가 성공적으로 수정되었습니다.',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '리뷰를 찾을 수 없거나 수정 권한이 없습니다.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() UpdateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, req.user.userId, UpdateReviewDto);
  }

  @ApiOperation({ summary: '리뷰 삭제' })
  @ApiParam({
    name: 'id',
    description: '리뷰 ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '리뷰가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '리뷰를 찾을 수 없거나 삭제 권한이 없습니다.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.reviewsService.remove(+id, req.user.userId);
  }
}
