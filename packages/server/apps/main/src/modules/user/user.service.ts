import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService, User } from '@app/common';
import {
  UserCreateRequestDto,
  UserCreateResponseDto,
  UserForceNewPasswordRequestDto,
  UserGetListRequestDto,
  UserGetListResponseDto,
  UserGetResponseDto,
  UserUpdateRequestDto,
} from './dto';
import { compare, hash } from 'bcrypt';
import { IncorrectDataException, NotFoundException } from '@app/exception';
import { DomainEntities } from '@app/exception/DomainEntities.enum';
import { Prisma, Type } from '@prisma/client';

@Injectable()
export class UserService {
  private static readonly bcryptSaltRound = 10;
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaClientService) {}

  private static mapUserToDto(user: User): UserGetResponseDto {
    return {
      birthday: user.birthday || undefined,
      company: undefined,
      email: user.email,
      enabled: user.enabled,
      id: user.id,
      image: user.image,
      lastLogin: user.lastLogin || undefined,
      lastname: user.lastname,
      name: user.name,
      sex: user.sex,
      type: user.type,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  }

  async forceNewPassword(userId: string, body: UserForceNewPasswordRequestDto): Promise<void> {
    this.logger.verbose(`Force password reset for user ${userId}`);
    // hash password with bcrypt
    const hashedPassword = await hash(body.newPassword, UserService.bcryptSaltRound);
    // update user password
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async changePassword(userId: string, password: string, newPassword: string): Promise<void> {
    this.logger.verbose(`Change password for user ${userId}`);
    const { password: hashedPassword } = await this.getById(userId);
    // check if password is correct
    const isPasswordCorrect = await compare(password, hashedPassword);
    if (!isPasswordCorrect) throw new IncorrectDataException('Password');
    // hash password with bcrypt and update user password
    const newHashedPassword = await hash(newPassword, UserService.bcryptSaltRound);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: newHashedPassword },
    });
  }

  async changeType(userId: string, type: Type): Promise<void> {
    this.logger.verbose(`Change user type for user ${userId}`);
    await this.getById(userId);
    // update user type
    await this.prisma.user.update({
      where: { id: userId },
      data: { type },
    });
  }

  async create(body: UserCreateRequestDto): Promise<UserCreateResponseDto> {
    this.logger.verbose(`Create user ${body.email}`);
    // hash password with bcrypt
    const hashedPassword = await hash(body.password, UserService.bcryptSaltRound);
    // create user
    const user = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        email: body.email,
        name: body.name,
        lastname: body.lastname,
        birthday: body.birthday,
        sex: body.sex,
        image: `https://www.gravatar.com/avatar/${body.email}?d=identicon`,
        type: body.type,
      },
    });
    // return user
    return { id: user.id };
  }

  async toggleActive(userId: string): Promise<void> {
    this.logger.verbose(`Toggle active for user ${userId}`);
    const user = await this.getById(userId);
    // toggle user active
    await this.prisma.user.update({
      where: { id: userId },
      data: { enabled: !user.enabled },
    });
  }

  async getUserById(userId: string): Promise<UserGetResponseDto> {
    this.logger.verbose(`Get user by id ${userId}`);
    const user = await this.getById(userId);
    return UserService.mapUserToDto(user);
  }

  async getAllUsers(paginator: UserGetListRequestDto): Promise<UserGetListResponseDto> {
    const { limit, skip, text, order, sort } = paginator;
    this.logger.verbose(
      `Get all users with limit ${limit} and skip ${skip} with sort ${sort} and order ${order} searching ${
        text || 'nothing'
      }`,
    );
    const where = this.buildWhere(paginator);
    return {
      count: await this.prisma.user.count({ where }),
      items: (
        await this.prisma.user.findMany({
          where,
          take: limit,
          skip,
          orderBy: { [sort]: order },
        })
      ).map((user) => UserService.mapUserToDto(user)),
    };
  }

  async updateUser(userId: string, body: UserUpdateRequestDto): Promise<void> {
    this.logger.verbose(`Update user ${userId}`);
    await this.getById(userId);
    // update user
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...body,
      },
    });
  }

  async deleteUser(userId: string): Promise<void> {
    this.logger.verbose(`Delete user ${userId}`);
    await this.getById(userId);
    // delete user
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  private buildWhere(pagination: UserGetListRequestDto): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = { deleted: false };
    if (pagination.text)
      where.OR = [
        { email: { contains: pagination.text } },
        { name: { contains: pagination.text } },
        { lastname: { contains: pagination.text } },
      ];
    return where;
  }

  private async getById(userId: string): Promise<User> {
    this.logger.verbose(`Get user by id ${userId}`);
    // get user from database
    const user = await this.prisma.user.findFirst({
      where: { id: userId, deleted: false },
    });
    // check if user exists
    if (!user) throw new NotFoundException(DomainEntities.USER);
    // return user
    return user;
  }
}
