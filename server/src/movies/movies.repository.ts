import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieInfo } from './types/movies.types';
import { MovieEntity } from './types/movie.entity';

@Injectable()
export class MoviesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: MovieEntity): Promise<void> {
    await this.prisma.movie.create({
      data,
    });
  }

  async findOneById(id: string): Promise<MovieInfo | null> {
    return await this.prisma.movie.findUnique({
      select: {
        id: true,
        averageRating: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: id,
      },
    });
  }
}
