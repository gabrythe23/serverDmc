import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    type: String,
  })
  @IsString()
  password: string;
}
