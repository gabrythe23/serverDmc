import { PaginationResponse } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserGetResponseDto } from '.';

export class UserGetListResponseDto implements PaginationResponse<UserGetResponseDto> {
  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: UserGetResponseDto, isArray: true })
  items: UserGetResponseDto[];
}
