import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class DuplicatedEntryException extends DomainException {
  static readonly httpStatus = HttpStatus.CONFLICT;

  constructor(msg = 'Duplicated Entry') {
    super(msg, DuplicatedEntryException.httpStatus);
  }
}
