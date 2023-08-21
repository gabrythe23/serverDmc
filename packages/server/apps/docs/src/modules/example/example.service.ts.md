# Service
the service is the logic of the module, here we define the business logic of the module.
Here we can use the previously imported services from other modules (like the PrismaClientService).

```ts
@Injectable()
export class ExampleService {
  private readonly logger = new Logger(ExampleService.name);

  /**
   * in the constructor of the service, we inject the PrismaClientService
   * so that we can use the PrismaClient instance to access the database.
   * the prisma client is provided by the PrismaClientService and is declared
   * as a provider in the module file.
   * @param prismaClient
   */
  constructor(private readonly prismaClient: PrismaClientService) {}
}
```

We must user different function keyword to define the different types of functions in the service,
like private or public. as standard private functions should be used for functions that are not
used outside of the service, and public functions should be used for functions that are used outside.

```ts
@Injectable()
export class ExampleService {
    /**
     * this is a private function that is not used outside of the service
     * @param id
     * @private
     */
    private async _getExampleById(id: number) {
        return this.prismaClient.example.findUnique({
            where: {
                id,
            },
        });
    }

    /**
     * this is a public function that is used outside of the service
     * @param id
     */
    async getExampleById(id: number) {
        return this._getExampleById(id);
    }
}
```
