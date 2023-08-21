import { Body, Controller, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import {
  UserChangePasswordRequestDto,
  UserGetListRequestDto,
  UserGetListResponseDto,
  UserGetResponseDto,
  UserUpdateRequestDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
import { DomainEntities } from '@app/exception/DomainEntities.enum';
import { DescribeMethod } from '@app/describe';

@Controller('user')
@ApiTags('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly service: UserService) {}

  @Patch(':userId/password')
  @DescribeMethod({
    body: UserChangePasswordRequestDto,
    summary: 'Change password',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async changePassword(
    @Param('userId') userId: string,
    @Body() body: UserChangePasswordRequestDto,
  ): Promise<void> {
    this.logger.log(`Change password for user ${userId}`);
    await this.service.changePassword(userId, body.password, body.newPassword);
  }

  @Get(':userId')
  @DescribeMethod({
    response: UserGetResponseDto,
    summary: 'Get user by id',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async getUserById(@Param('userId') userId: string): Promise<UserGetResponseDto> {
    this.logger.log(`Get user by id ${userId}`);
    return plainToInstance(UserGetResponseDto, await this.service.getUserById(userId));
  }

  @Get()
  @DescribeMethod({
    response: UserGetListResponseDto,
    summary: 'Get all users',
    entityName: DomainEntities.USER,
  })
  async getAllUsers(@Query() pagination: UserGetListRequestDto): Promise<UserGetListResponseDto> {
    this.logger.log('Get all users');
    return plainToInstance(UserGetListResponseDto, await this.service.getAllUsers(pagination));
  }

  @Post(':userId')
  @DescribeMethod({
    body: UserUpdateRequestDto,
    summary: 'Update user',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserUpdateRequestDto,
  ): Promise<void> {
    this.logger.log(`Update user ${userId}`);
    await this.service.updateUser(userId, body);
  }
}
