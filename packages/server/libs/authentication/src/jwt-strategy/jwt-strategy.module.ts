import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfigJWT } from '@app/starter/config';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const jwtConfig: AppConfigJWT = <AppConfigJWT>configService.get<AppConfigJWT>('jwt');
        return {
          secret: jwtConfig.accessTokenSecret,
          expiresIn: jwtConfig.accessTokenExpiration,
        };
      },
    }),
  ],
  providers: [JwtStrategyService],
  exports: [JwtStrategyService],
})
export class JwtStrategyModule {}
