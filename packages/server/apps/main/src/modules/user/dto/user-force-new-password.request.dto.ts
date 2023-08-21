import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserForceNewPasswordRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
