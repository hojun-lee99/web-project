import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    example: 'user@email.com',
    description: '이메일 형식이여야함',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: '비밀번호 형식은 아직 정해지지않음',
  })
  @IsString()
  readonly password: string;
}
