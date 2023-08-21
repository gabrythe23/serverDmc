import { NestFactory } from '@nestjs/core';
import { env } from '@app/util';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { stringify } from 'yaml';
import { AppConfigEnvironment } from '@app/starter/config';
import * as cookieParser from 'cookie-parser';

const makeSwaggerSetup = (
  app: NestExpressApplication,
  swaggerFolder = 'main',
  swaggerEndpointPath = 'documentation',
): void => {
  // swagger setup
  const config = new DocumentBuilder()
    .setTitle(swaggerFolder)
    .addServer('http://localhost:3000', 'Local')
    .build();
  // create swagger document
  const document = SwaggerModule.createDocument(app, config);

  const swaggerDirPath = `../common/api/${swaggerFolder}-definition.yml`;
  writeFileSync(swaggerDirPath, stringify(document));
  // setup swagger endpoint in app
  SwaggerModule.setup(swaggerEndpointPath, app, document);

  new Logger('Swagger').verbose(`Swagger endpoint: /${swaggerEndpointPath}`);
};

export const makeApp = async (
  module: unknown,
  appBase?: string,
): Promise<NestExpressApplication> => {
  const logger = new Logger(`Create App - ${appBase || 'main'}`);
  // create app
  const app = await NestFactory.create<NestExpressApplication>(module, {
    cors: true,
  });
  // set base path for service api prefix
  let basePath = env<string>('SERVICE_API_PREFIX', '') || '';
  if (basePath.length > 0) basePath += '/';
  // set service base path
  const serviceBasePath = `${basePath}${appBase || ''}`;
  app.use(cookieParser());
  // use validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // set global prefix
  app.setGlobalPrefix(serviceBasePath);
  logger.verbose(`Global Prefix: ${serviceBasePath}`);

  // set swagger if in development
  if (
    env<AppConfigEnvironment>('ENV', AppConfigEnvironment.DEVELOPMENT) ===
    AppConfigEnvironment.DEVELOPMENT
  ) {
    makeSwaggerSetup(app, appBase, 'documentation');
  }

  return app;
};
