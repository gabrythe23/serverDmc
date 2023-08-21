import { PaginationRequestDto, User } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum UserGetListRequestSort {
  EMAIL = 'email',
  NAME = 'name',
  LAST_NAME = 'lastname',
  LAST_LOGIN = 'lastLogin',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class UserGetListRequestDto extends PaginationRequestDto<User> {
  @ApiProperty({
    enum: UserGetListRequestSort,
    enumName: 'UserGetListRequestSort',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserGetListRequestSort)
  sort: UserGetListRequestSort = UserGetListRequestSort.CREATED_AT;
}
