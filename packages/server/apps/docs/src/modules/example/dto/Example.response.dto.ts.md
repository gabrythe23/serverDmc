# Response DTO

in this file we define the response DTOs for the module


```ts
@Exclude()
export class UserCreateUserResponseDto {
  @ApiProperty({ type: String, description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  userId: string;
}

```


## Decorators

### api property

````ts
@ApiProperty({ type: String, description: 'User ID' })
````
Just like the `@ApiProperty` decorator in the `DTO_REQUEST` file, this decorator is used to define the property of the DTO, it must be used on the property of the DTO.

### class validator

````ts
@IsString()
@IsNotEmpty()
````
This decorator is used to validate the property of the DTO, it must be used on the property of the DTO.

### exclude class transformer

````ts
@Exclude()
````
This decorator is used to exclude the property of the DTO from the response, it must be used on the property of the DTO.
This decorator must be used in class and not in the property. We use to exclude all the properties of the class and then we expose the properties that we want to show in the response and expose them with the `@Expose` decorator.

### expose class transformer

````ts
@Expose()
````
This decorator is used to expose the property of the DTO in the response, it must be used on the property of the DTO.

