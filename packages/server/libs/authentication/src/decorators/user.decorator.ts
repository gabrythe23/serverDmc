import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EXPRESS_REQUEST_USER_INFO } from '../const';
import { UserInfo } from '@app/authentication';

/**
 * this create a param decorator for GET the user info set in auth guard
 */
export const User = createParamDecorator((data: string, ctx: ExecutionContext): UserInfo => {
  const request: Record<string, unknown> = ctx.switchToHttp().getRequest();
  return request[EXPRESS_REQUEST_USER_INFO] as UserInfo;
});
