import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class AuthMalformedTokenException extends DomainException {
  constructor(msg = 'Access token expired') {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
