import { env } from '@app/util';

export enum AppConfigEnvironment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export interface AppConfig {
  env: string;
  apiPrefix: string;
  jwt: AppConfigJWT;
  authentication: AppConfigAuthentication;
}

export interface AppConfigAuthentication {
  jwtHeaderKey: string;
}

export interface AppConfigJWT {
  accessTokenSecret: string;
  accessTokenExpiration: string;
  refreshTokenSecret: string;
  refreshTokenExpiration: string;
}

export default {
  env: env<AppConfigEnvironment>('ENV', AppConfigEnvironment.DEVELOPMENT),
  apiPrefix: env<string>('SERVICE_API_PREFIX', ''),
  jwt: {
    accessTokenSecret: env<string>('JWT_ACCESS_SECRET', 'secret'),
    accessTokenExpiration: env<string>('JWT_ACCESS_EXPIRES_IN', '1d'),
    refreshTokenSecret: env<string>('JWT_REFRESH_SECRET', 'secret'),
    refreshTokenExpiration: env<string>('JWT_REFRESH_EXPIRES_IN', '1d'),
  },
} as AppConfig;
