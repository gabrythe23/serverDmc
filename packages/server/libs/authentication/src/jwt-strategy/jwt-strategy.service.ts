import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfigJWT } from '@app/starter/config';
import { AuthMalformedTokenException, AuthRefreshTokenExpiredException } from '@app/exception';
import { UserInfo } from '@app/authentication/auth.interfaces';

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategyService {
  private readonly logger = new Logger(JwtStrategyService.name);

  private readonly jwtConfig: AppConfigJWT;

  constructor(configService: ConfigService, private readonly jwtService: JwtService) {
    this.jwtConfig = <AppConfigJWT>configService.get<AppConfigJWT>('jwt');
  }

  async validateAndDecodeRefreshToken(refresh: string): Promise<UserInfo> {
    const decode = await this.verifyToken(refresh, this.getRefreshTokenOptions());
    return { id: decode.id as string };
  }

  async validateAndDecodeAccessToken(access: string): Promise<UserInfo> {
    const decode = await this.verifyToken(access, this.getAccessTokenOptions());
    return { id: decode.userId as string };
  }

  signRefreshToken(id: string): string {
    return this.signToken({ id }, this.getRefreshTokenOptions());
  }

  signAccessToken(id: string): string {
    return this.signToken({ id }, this.getAccessTokenOptions());
  }

  private signToken(payload: UserInfo, options: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  private getRefreshTokenOptions(): JwtSignOptions {
    return {
      expiresIn: this.jwtConfig.refreshTokenExpiration,
      secret: this.jwtConfig.refreshTokenSecret,
    };
  }

  private getAccessTokenOptions(): JwtSignOptions {
    return {
      expiresIn: this.jwtConfig.accessTokenExpiration,
      secret: this.jwtConfig.accessTokenSecret,
    };
  }

  private async verifyToken(
    token: string,
    options: JwtSignOptions,
  ): Promise<Record<string, unknown>> {
    let decode: null | Record<string, unknown> | string;
    try {
      await this.jwtService.verifyAsync(token, options);
      decode = this.jwtService.decode(token);
    } catch (err) {
      throw new AuthRefreshTokenExpiredException();
    }

    if (!decode) throw new AuthMalformedTokenException('Token is invalid');
    if (typeof decode === 'string') throw new AuthMalformedTokenException('Token is invalid');
    if (!decode['id']) throw new AuthMalformedTokenException('Token is invalid');

    return decode;
  }
}
