import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@app/common';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UserChangeTypeRequestDto {
  @ApiProperty({ enum: Type, enumName: 'Type' })
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;
}
