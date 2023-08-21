import { ApiProperty } from '@nestjs/swagger';
import { Gender, Type } from '@app/common';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateRequestDto {
  @ApiProperty({ type: Date, required: false })
  @IsOptional()
  @IsDate()
  birthday?: Date;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  companyId?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Gender, enumName: 'Gender' })
  @IsNotEmpty()
  @IsEnum(Gender)
  sex: Gender;

  @ApiProperty({ enum: Type, enumName: 'Type' })
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;
}
