import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DomainException extends HttpException {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Number })
  statusCode: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super({ message, statusCode: status }, status);
  }
}
