import { Gender, Type } from '@app/common';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserGetResponseCompanyDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String })
  @Expose()
  image: string;
}

@Exclude()
export class UserGetResponseDto {
  @ApiProperty({ type: Date, required: false })
  @Expose()
  birthday?: Date;

  @ApiProperty({ type: UserGetResponseCompanyDto, required: false })
  @Expose()
  company?: UserGetResponseCompanyDto;

  @ApiProperty({ type: String })
  @Expose()
  email: string;

  @ApiProperty({ type: Boolean })
  @Expose()
  enabled: boolean;

  @ApiProperty({ type: String })
  @Expose()
  id: string;

  @ApiProperty({ type: String })
  @Expose()
  image: string;

  @ApiProperty({ type: Date, required: false })
  @Expose()
  lastLogin?: Date;

  @ApiProperty({ type: String })
  @Expose()
  lastname: string;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ enum: Gender, enumName: 'Gender' })
  sex: Gender;

  @ApiProperty({ enum: Type, enumName: 'Type' })
  type: Type;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
