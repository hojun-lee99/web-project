import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;
}

export class RegistrationRequiredDto {
  @ApiProperty({
    example: true,
    description: '회원가입 필요 여부',
  })
  requireRegistration: boolean;

  @ApiProperty({
    example: 'user@example.com',
    description: '소셜 계정 이메일',
  })
  email: string;

  @ApiProperty({
    example: 'Registration required',
    description: '회원가입 필요 메시지',
  })
  message: string;
}
