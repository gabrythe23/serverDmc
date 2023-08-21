import { SetMetadata } from '@nestjs/common';
import { DECORATOR_ONLY_SUPER_ADMIN } from '../const';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

// set controller or method only for super admin
export const OnlySuperAdmin = (): CustomDecorator => SetMetadata(DECORATOR_ONLY_SUPER_ADMIN, true);
