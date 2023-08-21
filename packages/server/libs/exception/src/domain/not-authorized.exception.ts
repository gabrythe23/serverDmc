import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class NotAuthorizedException extends DomainException {
  constructor() {
    super('Not Authorized', HttpStatus.FORBIDDEN);
  }
}
