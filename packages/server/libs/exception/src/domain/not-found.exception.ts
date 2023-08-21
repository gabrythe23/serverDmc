import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain.exception';
import { DomainEntities } from '@app/exception/DomainEntities.enum';

export class NotFoundException extends DomainException {
  constructor(schema: DomainEntities = DomainEntities.GENERAL_ENTITY) {
    super(`${schema} Not Found`, HttpStatus.NOT_FOUND);
  }
}
