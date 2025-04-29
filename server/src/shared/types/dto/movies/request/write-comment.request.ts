import { IsString } from 'class-validator';

export class WriteCommentDto {
  @IsString()
  readonly comment: string;
}
