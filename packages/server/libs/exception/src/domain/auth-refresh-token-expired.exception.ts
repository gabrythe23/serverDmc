import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class AuthRefreshTokenExpiredException extends DomainException {
  constructor(msg = 'Refresh token expired') {
    super(msg, HttpStatus.UNAUTHORIZED);
  }
}
