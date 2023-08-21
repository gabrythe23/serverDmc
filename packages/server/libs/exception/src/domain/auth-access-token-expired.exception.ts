import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class AuthAccessTokenExpiredException extends DomainException {
  constructor(msg = 'Access token expired') {
    super(msg, HttpStatus.I_AM_A_TEAPOT);
  }
}
