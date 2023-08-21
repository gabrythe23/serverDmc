import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { appModules } from './modules';
import { AuthGuard, JwtStrategyModule } from '@app/authentication';
import { HttpExceptionFilter } from '@app/exception';
import { HealthCheckModule } from '@app/health-check';
import { PrismaClientModule, PrismaClientService } from '@app/common';

@Module({
  imports: [
    // load configuration
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // load health check module
    HealthCheckModule,
    // load prism client module
    PrismaClientModule,
    // load jwt strategy module
    JwtStrategyModule,
    // load app modules
    ...appModules,
  ],
  providers: [
    // provide prisma client service
    PrismaClientService,
    // set auth guard to all controllers
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // set exception filter to all controllers
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule {}
