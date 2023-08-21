# App Main Module

with this module we bootstrap the application and we load all the modules that we need for the application.
In this module we must load:
- the configuration module with the following configuration:
  ```ts
    // Load configuration from .env file
    ConfigModule.forRoot({
    // ignore the .env file if the environment is development
    ignoreEnvFile: env('ENV', 'development') === 'development',
    // load the .env file from the root of the project if the environment is not development
    envFilePath: './.env',
    // load the configuration from the configuration file in the starter folder if the environment is development
    load: [configuration],
    // make the configuration global so we can inject it in any module
    isGlobal: true,
    })
  ```
- the health check module
  ```ts
  HealthCheckModule
  ```
- the prisma client module
  ```ts
  PrismaClientModule
  ```

and provide the following services:
- the prisma client service for all modules
  ```ts
  PrismaClientService
  ```
- the authentication guard for all controllers for all controllers that need authentication
  ```ts
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ```
- the exception filter for all controllers for server errors and exceptions
  ```ts
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ```

The final code of the app module should be something like this:
```ts

@Module({
  imports: [
    // Load configuration from .env file
    ConfigModule.forRoot({
      ignoreEnvFile: env('ENV', 'development') === 'development',
      envFilePath: './.env',
      load: [configuration],
      isGlobal: true,
    }),
    // Load health check module
    HealthCheckModule,
    // Load prisma client module
    PrismaClientModule,
    // Load all modules
    ...appModules,
  ],
  providers: [
    // Load prisma client service
    PrismaClientService,
    // Load authentication guard for all controllers
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // Load exception filter for all controllers
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule {}

```
