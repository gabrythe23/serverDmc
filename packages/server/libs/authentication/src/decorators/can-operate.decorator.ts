import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { DECORATOR_CAN_OPERATE } from '../const';

export interface CanOperateOptions {
  tenantIdKey?: string;
  assetIdKey?: string;
  permission?: string;
}

// set permission for router defining tenantIdKey and assetIdKey and permission
export const CanOperate = (options: CanOperateOptions): CustomDecorator =>
  SetMetadata(DECORATOR_CAN_OPERATE, options);
