import { Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, MeResponseDto } from './dto';
import { CookieOptions, Request, Response } from 'express';
import { User, UserInfo } from '@app/authentication';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@app/authentication/const';
import { plainToInstance } from 'class-transformer';
import { DomainEntities } from '@app/exception/DomainEntities.enum';
import { DescribeMethod } from '@app/describe';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly cookieOptions: CookieOptions = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: true,
    sameSite: 'strict',
  };
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @DescribeMethod({
    body: LoginRequestDto,
    summary: 'Login',
    entityName: DomainEntities.USER,
    public: true,
  })
  @ApiBody({ type: LoginRequestDto })
  async login(@Body() loginDto: LoginRequestDto, @Res() res: Response): Promise<void> {
    this.logger.log(`login: ${JSON.stringify(loginDto.email)}`);
    const { accessToken, refreshToken } = await this.authService.login(loginDto);

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, this.cookieOptions);
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, this.cookieOptions);
    res.status(200).send();
  }

  @Post('refresh')
  @DescribeMethod({
    summary: 'Refresh access token',
    entityName: DomainEntities.USER,
    public: true,
  })
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    const cookies: Record<string, string> = req.cookies as Record<string, string>;
    this.logger.log(`refresh: ${cookies['refreshToken']}`);
    const { accessToken, refreshToken } = await this.authService.refresh(
      cookies[REFRESH_TOKEN_COOKIE_NAME],
      cookies[ACCESS_TOKEN_COOKIE_NAME],
    );

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, this.cookieOptions);
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, this.cookieOptions);
    res.status(200).send();
  }

  @Post('logout')
  @DescribeMethod({
    summary: 'Logout',
    entityName: DomainEntities.USER,
  })
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    this.logger.log('logout');
    const cookies: Record<string, string> = req.cookies as Record<string, string>;
    await this.authService.logout(
      cookies[REFRESH_TOKEN_COOKIE_NAME],
      cookies[ACCESS_TOKEN_COOKIE_NAME],
    );
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    res.status(200).send();
  }

  @Get('me')
  @DescribeMethod({
    summary: 'Get current user',
    entityName: DomainEntities.USER,
  })
  @ApiResponse({ type: MeResponseDto })
  async me(@User() user: UserInfo): Promise<MeResponseDto> {
    this.logger.log(`me: ${user.id}`);
    return plainToInstance(MeResponseDto, await this.authService.me(user));
  }
}
