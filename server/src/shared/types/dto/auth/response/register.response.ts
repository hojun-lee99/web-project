import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
    description: 'Access Token(JWT)',
  })
  readonly accessToken: string;

  @ApiProperty({
    example: 'd0e847af-21e7-413d-ae46-d07277f46a08',
    description: '회원 고유 ID (UUID V4)',
  })
  readonly id: string;

  @ApiProperty({ example: 'username', description: '회원 이름 (닉네임)' })
  readonly name: string;

  @ApiProperty({ example: 'user@email.com', description: '회원 이메일' })
  readonly email: string;
}
