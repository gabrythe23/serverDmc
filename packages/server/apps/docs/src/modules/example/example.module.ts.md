# Module Entrypoint

The entrypoint of the module is the module file, in this file we import the PrismaClientModule and we export the module.
We must:
- import the needed modules in the imports array (like the PrismaClientModule)
- provide the Service in the providers array (like the ExampleService)
- provide the Controller in the controllers array (like the ExampleController)

## Controller
the controller is the entrypoint of the module, here we define the routes of the module.

## Service
the service is the logic of the module, here we define the business logic of the module.


````ts
@Module({
  /**
   * we import the PrismaClientModule
   */
  imports: [PrismaClientModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
````
