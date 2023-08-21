# DMC SERVER



## Before you start
### must have installed on your machine:
- nodejs
- yarn
- docker
### check:
- change package.json name with your own and run `yarn`.
- have a look of example env into `/src/config/.example.env` and create a new env file for your needs.

### create new nestjs app

```bash
$ nest generate app <app-name>
```

### create new nestjs library

```bash
$ nest generate library <lib-name>
```

## Running the app

```bash
# dev mode
$ yarn start:<project>:dev
# watch mode
$ yarn start:<project>:watch
# production mode
$ yarn start:<project>:prod
```

## Test

```bash
# unit tests
$ yarn test
# test coverage
$ yarn test:cov
# test coverage debug
$ yarn test:debug
```

## Docker

### Build

```bash
# create docker build
$ docker build --build-arg PROJECT=<project>  -t dmc-server-<project>:latest .
```

### Run

```bash
# create docker build
$ docker run -p 3000:3000 -e APP=main dmc-server-<project>:latest
```

# What's inside

## Config module

#### https://docs.nestjs.com/techniques/configuration

This module manage a JSON object (you can see that object in `config/configuration.ts`), for having all the
configurations in one place, this module allows you to inject that JSON configuration onto another modules for inject
your configuration during setup.\
I've also created a small helper function into `configuration.ts` that allow you to call env var (process.env) without
the prefix object (process.env) and, if the selected variable isn't set the function set the default as your wish.\

## Class Validators

#### https://docs.nestjs.com/pipes#class-validator

You can configure the validator into `main.ts`.\

```ts
// use validation pipe
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
);
```

## Guard

#### https://docs.nestjs.com/microservices/guards

This is like a bodyguard that watch every request and send `true/false`. Works in junction with `isPublic` decorator.

## Decorators

#### https://docs.nestjs.com/custom-decorators#custom-route-decorators

I've created a public decorator that set a flag into request context for mark an endpoint as public (skip guard check).

## Open Api

#### https://docs.nestjs.com/openapi/introduction

The configuration is into `main.ts`, currently mounted on `/documentation` path

## Exception Filter (Domain Exception)

#### https://docs.nestjs.com/exception-filters

you can edit this configuration (and extend it) by looking into `exceptions` folder.

## Additional Documentation Info

- #### [Logger Class](https://docs.nestjs.com/techniques/logger)
- #### [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)
- #### [Terminus](https://docs.nestjs.com/recipes/terminus)
