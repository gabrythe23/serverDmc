import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class ConflictException extends DomainException {
  constructor(msg = 'Conflict') {
    super(msg, HttpStatus.CONFLICT);
  }
}
