import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum PaginationOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export class PaginationRequestDto<T> {
  @ApiProperty({ type: Number, required: false, default: 20 })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  limit = 20;

  @ApiProperty({ type: Number, required: false, default: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  skip = 0;

  @ApiProperty({ type: Number, required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text?: string;

  @ApiProperty({
    enum: PaginationOrder,
    enumName: 'PaginationOrder',
    required: false,
  })
  @IsEnum(PaginationOrder)
  @IsOptional()
  order: PaginationOrder = PaginationOrder.DESCENDING;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  sort?: keyof T | string = 'createdAt';
}

export interface PaginationResponse<T> {
  count: number;
  items: T[];
}
