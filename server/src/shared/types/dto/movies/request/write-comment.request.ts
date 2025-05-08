import { IsString } from 'class-validator';

export class WriteCommentRequest {
  @IsString()
  readonly comment: string;
}
