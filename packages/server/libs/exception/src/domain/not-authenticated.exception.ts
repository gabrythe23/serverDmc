import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class NotAuthenticatedException extends DomainException {
  constructor() {
    super('User not logged in', HttpStatus.UNAUTHORIZED);
  }
}
