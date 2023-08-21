import { Body, Controller, Delete, Logger, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import {
  UserChangeTypeRequestDto,
  UserCreateRequestDto,
  UserCreateResponseDto,
  UserForceNewPasswordRequestDto,
  UserUpdateRequestDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
import { DomainEntities } from '@app/exception/DomainEntities.enum';
import { DescribeMethod } from '@app/describe';

@Controller('admin/user')
@ApiTags('admin', 'user')
export class AdminUserController {
  private readonly logger = new Logger(AdminUserController.name);

  constructor(private readonly service: UserService) {}

  @Patch(':userId/force-password-reset')
  @DescribeMethod({
    body: UserForceNewPasswordRequestDto,
    summary: 'Force password reset',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async forceNewPassword(
    @Param('userId') userId: string,
    @Body() body: UserForceNewPasswordRequestDto,
  ): Promise<void> {
    this.logger.log(`Force password reset for user ${userId}`);
    await this.service.forceNewPassword(userId, body);
  }

  @Patch(':userId/type')
  @DescribeMethod({
    body: UserChangeTypeRequestDto,
    summary: 'Change user type',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async changeType(
    @Param('userId') userId: string,
    @Body() body: UserChangeTypeRequestDto,
  ): Promise<void> {
    this.logger.log(`Change user type for user ${userId}`);
    await this.service.changeType(userId, body.type);
  }

  @Put()
  @DescribeMethod({
    body: UserCreateRequestDto,
    response: UserCreateResponseDto,
    summary: 'Create user',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async createUser(@Body() body: UserCreateRequestDto): Promise<UserCreateResponseDto> {
    this.logger.log(`Create user ${body.email}`);
    return plainToInstance(UserCreateResponseDto, await this.service.create(body));
  }

  @Patch(':userId/toggle-active')
  @DescribeMethod({
    summary: 'Toggle user active',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async toggleActive(@Param('userId') userId: string): Promise<void> {
    this.logger.log(`Toggle user active for user ${userId}`);
    await this.service.toggleActive(userId);
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

  @Delete(':userId')
  @DescribeMethod({
    summary: 'Delete user',
    entityName: DomainEntities.USER,
    entityParamKey: 'userId',
  })
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    this.logger.log(`Delete user ${userId}`);
    await this.service.deleteUser(userId);
  }
}
