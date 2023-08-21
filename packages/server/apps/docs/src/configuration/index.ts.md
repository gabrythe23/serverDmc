# Configuration/index.ts

This file is the entry point of the configuration module, here we export the configuration module with the configuration service and the configuration loader.

This file must contain the following code:
```ts
import config, { AppConfig } from '@app/starter/config';

export default (): AppConfig => config;
```
This is just a pass through function that return the configuration object from the config file in the starter folder.
