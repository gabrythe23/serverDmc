import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@app/common';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @ApiProperty({ type: Date, required: false })
  @IsOptional()
  @IsDate()
  birthday?: Date;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Gender, enumName: 'Gender' })
  @IsNotEmpty()
  @IsEnum(Gender)
  sex: Gender;
}
