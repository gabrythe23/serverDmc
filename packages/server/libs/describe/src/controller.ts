import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OperationLog, Public } from '@app/authentication';
import { DomainEntities } from '@app/exception/DomainEntities.enum';

export interface DescribeMethodOptions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  body?: Type<unknown> | Function | [Function] | string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  response?: Type<unknown> | Function | [Function] | string;
  summary: string;
  entityName: DomainEntities;
  entityParamKey?: string;
  public?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function DescribeMethod(options: DescribeMethodOptions) {
  const decorators = [
    ApiOperation({ summary: options.summary }),
    OperationLog({
      operation: options.summary,
      entityName: options.entityName,
      refIdKey: options.entityParamKey,
    }),
  ];
  // public decorator is used for public routes
  if (!options.public) decorators.push(ApiCookieAuth());
  else decorators.push(Public());

  if (options.body) decorators.push(ApiBody({ type: options.body }));
  if (options.response) decorators.push(ApiResponse({ type: options.response }));

  return applyDecorators(...decorators);
}
