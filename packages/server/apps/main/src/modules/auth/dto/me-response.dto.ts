import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Type } from '@prisma/client';

@Exclude()
export class MeCompanyResponseDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string;

  @ApiProperty({ type: String })
  @Expose()
  logo: string;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ enum: Type, enumName: 'Type', required: true })
  @Expose()
  type: Type;

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;
}

@Exclude()
export class MeResponseDto {
  @ApiProperty({ type: String })
  @Expose()
  id: string;

  @ApiProperty({ type: String })
  @Expose()
  email: string;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String })
  @Expose()
  lastname: string;

  @ApiProperty({ type: MeCompanyResponseDto, required: false })
  @Expose()
  company?: MeCompanyResponseDto;

  @ApiProperty({ type: Date, required: false })
  @Expose()
  birthday?: Date;

  @ApiProperty({ enum: Gender, enumName: 'Gender', required: true })
  @Expose()
  sex: Gender;

  @ApiProperty({ type: String })
  @Expose()
  image: string;

  @ApiProperty({ enum: Type, enumName: 'Type', required: true })
  @Expose()
  type: Type;

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;
}
