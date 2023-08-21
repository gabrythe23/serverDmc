import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';

export class InternalServerErrorException extends DomainException {
  constructor(msg: string) {
    super(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
