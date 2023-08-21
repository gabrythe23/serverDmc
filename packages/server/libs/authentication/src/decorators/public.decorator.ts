import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { DECORATOR_IS_PUBLIC } from '../const';

// set controller or method to public and skip auth guard
export const Public = (): CustomDecorator => SetMetadata(DECORATOR_IS_PUBLIC, true);
