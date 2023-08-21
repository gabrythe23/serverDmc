# Main.ts

This is the entry point of the application, here we bootstrap the application and start the server.
With this function we can create a new nestjs application with a custom configuration,
provided from makeApp function that is a wrapper of NestFactory.create that create a new nestjs application.
We also pass the name of the project that we want to start, this is useful for the configuration module that will load the correct configuration for the project,
and after that we start the server on the port specified in the environment variable SERVICE_PORT.
```ts
async function bootstrap(): Promise<void> {
  const app = await makeApp(AppModule, 'user');
  await app.listen(env<number>('SERVICE_PORT', 3000));
}
```
The second part of the main.ts we call the bootstrap function and we log the start of the application.
```ts
bootstrap()
  .then(() => logger.log(`App ${pkg.name} Version ${pkg.version} Started!`))
  .catch((err) =>
    logger.error(
      `App ${pkg.name} Version ${pkg.version}  Crash: ${err instanceof Error ? err.message : ''}`,
    ),
  );
```
