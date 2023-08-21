import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class IncorrectDataException extends DomainException {
  constructor(message = 'Incorrect data') {
    super(message, HttpStatus.PRECONDITION_FAILED);
  }
}
