import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterRequest {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'username' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  readonly password: string;
}
