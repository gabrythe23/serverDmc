import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService } from '@app/common';
import { JwtStrategyService, UserInfo } from '@app/authentication';
import { LoginRequestDto, LoginResponseDto, MeResponseDto } from './dto';
import { compare } from 'bcrypt';
import {
  AuthRefreshTokenExpiredException,
  IncorrectDataException,
  NotFoundException,
} from '@app/exception';
import { DomainEntities } from '@app/exception/DomainEntities.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaClientService,
    private readonly jwtStrategy: JwtStrategyService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const userFromDb = await this.prisma.user.findFirst({
      where: { email: loginDto.email },
      select: { id: true, password: true },
    });
    if (!userFromDb) throw new NotFoundException(DomainEntities.USER);

    const isPasswordCorrect = await compare(loginDto.password, userFromDb.password);
    if (!isPasswordCorrect) throw new IncorrectDataException();

    return {
      accessToken: this.jwtStrategy.signAccessToken(userFromDb.id),
      refreshToken: this.jwtStrategy.signRefreshToken(userFromDb.id),
    };
  }

  async refresh(refreshToken: string, accessToken: string): Promise<LoginResponseDto> {
    try {
      const { id } = await this.jwtStrategy.validateAndDecodeRefreshToken(refreshToken);
      await this.prisma.invalidatedToken.create({ data: { token: accessToken } });
      return {
        accessToken: this.jwtStrategy.signAccessToken(id),
        refreshToken,
      };
    } catch (e) {
      this.logger.error(e);
      throw new AuthRefreshTokenExpiredException();
    }
  }

  async logout(refreshToken: string, accessToken: string): Promise<void> {
    await this.prisma.invalidatedToken.create({ data: { token: accessToken } });
    await this.prisma.invalidatedToken.create({ data: { token: refreshToken } });
  }

  async me(userInfo: UserInfo): Promise<MeResponseDto> {
    const userFromDb = await this.prisma.user.findFirst({
      where: { id: userInfo.id },
      include: {
        company: true,
      },
    });
    if (!userFromDb) throw new NotFoundException(DomainEntities.USER);

    return {
      id: userFromDb.id,
      email: userFromDb.email,
      name: userFromDb.name,
      lastname: userFromDb.lastname,
      birthday: userFromDb.birthday || undefined,
      createdAt: userFromDb.createdAt,
      image: userFromDb.image,
      sex: userFromDb.sex,
      type: userFromDb.type,
      company: !userFromDb.company
        ? undefined
        : {
            createdAt: userFromDb.company.createdAt,
            name: userFromDb.company.name,
            type: userFromDb.company.type,
            logo: userFromDb.company.logo,
            id: userFromDb.company.id,
          },
    };
  }
}
