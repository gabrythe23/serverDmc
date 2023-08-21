# Request DTO

Here we define the request DTO of the module, this DTO is used to validate the request body of the route.
The DTO is used by the controller to validate the request body, we also use the DTO to generate the swagger documentation and class transformer and class validator to validate the request body.

## ExampleRequestDto

```ts


export class ExampleRequestDto {
  @ApiProperty({ type: String, description: 'User email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: CreateTenantRequestPermissionDto,
    description: 'User permission ID',
    required: false,
  })
  @IsOptional()
  @Validate(RoleAndPermissionNotEmpty)
  @ValidateNested()
  @Type(() => CreateTenantRequestPermissionDto)
  permission?: CreateTenantRequestPermissionDto;
}

```


## Decorators

### api property description

````ts
@ApiProperty({ type: String, description: 'User email' })
````
This decorator is used to define the property of the DTO, it must be used on the property of the DTO.
If we want to describe an array we must use the `isArray` property like this:
````ts
@ApiProperty({ type: String, description: 'User email', isArray: true })
````

If we want to describe a nested object we must use the `type` property like this:
````ts
@ApiProperty({ type: CreateTenantRequestPermissionDto, description: 'User permission ID' })
````


### class validator

````ts
@IsString() // the property must be a string
@IsNotEmpty() // the property must not be empty
@IsEmail() // the property must be a valid email
@IsOptional() // the property is optional
````

for full list of class validator decorators see [here](https://github.com/typestack/class-validator)

if we want to validate a nested object we can use the `@ValidateNested()` decorator.

if we need to validate a custom object we can use the `@Type()` decorator

if we need to validate an array we must use `@IsArray()` and/or `@ValidateNested({ each: true })`
