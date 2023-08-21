import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PrismaClientService } from '@app/common';
import { JwtStrategyService } from '@app/authentication/jwt-strategy';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  DECORATOR_IS_PUBLIC,
  EXPRESS_REQUEST_USER_INFO,
} from '@app/authentication/const';
import { AuthAccessTokenExpiredException } from '@app/exception';
import { UserInfo } from '@app/authentication/auth.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(AuthGuard.name);

  constructor(
    configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaClientService,
    private readonly jwtStrategy: JwtStrategyService,
  ) {}

  private static setUserInfoToReq(context: ExecutionContext, userInfo: UserInfo): void {
    const request: Record<string, unknown> = context.switchToHttp().getRequest();
    request[EXPRESS_REQUEST_USER_INFO] = userInfo;
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    if (this.isPublic(ctx)) return true;

    const userInfo = await this.getTokenFromCookie(ctx);
    AuthGuard.setUserInfoToReq(ctx, userInfo);

    return true;
  }

  private async getTokenFromCookie(ctx: ExecutionContext): Promise<UserInfo> {
    const { cookies }: { cookies: Record<string, string> } = ctx.switchToHttp().getRequest();
    const accessToken = cookies[ACCESS_TOKEN_COOKIE_NAME];
    if (!accessToken.length) throw new AuthAccessTokenExpiredException();

    const isInvalid = await this.prisma.invalidatedToken.findFirst({
      where: { token: accessToken },
    });
    if (isInvalid) throw new AuthAccessTokenExpiredException();
    try {
      return await this.jwtStrategy.validateAndDecodeAccessToken(accessToken);
    } catch (err) {
      throw new AuthAccessTokenExpiredException();
    }
  }

  private isPublic(ctx: ExecutionContext): boolean {
    return (
      this.reflector.getAllAndOverride<boolean>(DECORATOR_IS_PUBLIC, [
        ctx.getHandler(),
        ctx.getClass(),
      ]) || false
    );
  }
}
