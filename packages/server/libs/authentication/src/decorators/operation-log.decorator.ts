import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { DECORATOR_OPERATION_LOG } from '../const';

export interface OperationLogOptions {
  refIdKey?: string;
  entityName?: string;
  operation: OperationLogName;
}

export type OperationLogName = string;

export type OperationLogParams = OperationLogOptions | string;

// set permission for router defining tenantIdKey and assetIdKey and permission
export const OperationLog = (operationLogOptions: OperationLogParams): CustomDecorator =>
  SetMetadata(DECORATOR_OPERATION_LOG, operationLogOptions);
