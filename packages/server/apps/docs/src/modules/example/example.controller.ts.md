# Controller

Here we define the routes of the module, and we manage the user permissions too.


## Decorators

### controller
````ts
@Controller()
````
This decorator is used to define the controller, it must be used on the class that define the controller.
We can also pass a string to the decorator to define the route, like this:
````ts
@Controller('example')
````
### api tag
````ts
@ApiTags('example')
````
This decorator is used to define the tag of the controller, it must be used on the class that define the controller.
Can be applied to controllers and methods.
### api operation
````ts
@Get()
@Post()
@Put()
@Delete()
````
These decorators are used to define the route of the controller, it must be used on the function that define the route.
We can also pass a string to the decorator to define the route, like this:
````ts
@Get('example')
````

### define the api response for swagger
````ts
@ApiOkResponse({ type: UserGetListResponseDto })
````
This decorator is used to define the response of the route, it must be used on the function that define the route.

### define the api request body for swagger
````ts
@ApiBody({ type: UserCreateDto })
````
This decorator is used to define the request body of the route, it must be used on the function that define the route.

### describe api operation for swagger
````ts
@ApiOperation({ summary: 'Get all users' })
````
This decorator is used to describe the route, it must be used on the function that define the route.

### Make route or controller public
````ts
@Public()
````
This decorator is used to make the route or the controller public, it must be used on the function or the class that define the route or the controller.
Can be applied to controllers and methods.
### add operation log
````ts
@OperationLog('Get all users')
````
This decorator is used to add an operation log, it must be used on the function that define the route.
We can also pass an object to the decorator to define the log, like this:
````ts
@OperationLog({
  operation: 'Get selected example',
  refIdKey: 'exampleId',
  entityName: 'example',
})
````
in this case we define the operation name in the operation key, the refIdKey represent the key of the parameter in url that we want to use as refId, and the entityName represent the name of the entity that we want to log.

## Params Decorator
This kind of decorators are used to get the params from the request like the query params or the body params.

### get query params
````ts
@Query('example')
````
This decorator is used to get the query params from the request, it must be used on the function that define the route.

### get body params
````ts
@Body('example')
````
This decorator is used to get the body params from the request, it must be used on the function that define the route.
If we don't provide a key to the decorator, it will get all the body params.

### get params from url
````ts
@Param('example')
````
This decorator is used to get the params from the url, it must be used on the function that define the route.

### get user from request
````ts
@User()
````
This decorator is used to get the user from the request, it must be used on the function that define the route.



```ts
@Controller()
@ApiTags('user')
export class ExampleController {
  private readonly logger = new Logger(ExampleController.name);

  constructor(private readonly service: ExampleService) {}

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UserGetListResponseDto })
  @OperationLog('Get all users')
  async getUsers(
    @Param('tenantId') tenantId: string,
    @Query() pagination: UserGetListRequestDto,
    @User() userInfo: UserInfo,
  ): Promise<UserGetListResponseDto> {
    this.logger.log('  Get  all  users');
    // convert plain object to instance of UserGetListResponseDto
    return plainToInstance(
      UserGetListResponseDto,
      await this.service.getUsers(pagination, userInfo),
    );
  }
}
```

## DTO RESPONSE
if we want to return a response to the client, we must define a DTO response, this DTO will be used to define the response of the route, and it will be used to convert the response to a json object.
The object returned by the service must be converted to an instance of the DTO response, like this:
````ts
return plainToInstance(
  DTO_RESPONSE,
  await this.service.randomCall(),
);
````

Where the first argument is the DTO response, and the second argument is the object returned by the service.
