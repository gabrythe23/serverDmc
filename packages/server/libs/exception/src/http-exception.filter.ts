import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { DomainException } from './domain.exception';
import { env } from '@app/util';
import { HttpAdapterHost } from '@nestjs/core';

interface ErrorPayload {
  statusCode: HttpStatus;
  timestamp: number;
  path: string;
  message: string;
  stack?: string;
  details?: Record<string, unknown>;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private static getStatus(exception: HttpException): HttpStatus {
    const constructor = exception.constructor;
    if (constructor === DomainException) return exception.getStatus();
    if (exception.getStatus()) return exception.getStatus();
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private static getPayload(
    exception: HttpException | object,
    statusCode: HttpStatus,
    request: Request,
  ): ErrorPayload {
    const payload: ErrorPayload = {
      statusCode,
      timestamp: Date.now(),
      path: request.url,
      message: (exception as Error).message || 'Internal Server Error',
    };

    if (exception instanceof HttpException && exception.getResponse() === 'object') {
      payload.details = exception.getResponse() as Record<string, unknown>;
      payload.message = (
        payload.details.message ||
        payload.details.errorMessage ||
        payload.message
      ).toString();

      delete payload.details.errorMessage;
      delete payload.details.message;
      delete payload.details.statusCode;
      if (typeof payload.details === 'object' && !Object.keys(payload.details).length)
        delete payload.details;
    }

    if (env<string>('ENV', 'develop') !== 'production' && exception instanceof Error)
      payload.stack = exception.stack as string;
    return payload;
  }

  catch(exception: Error, host: ArgumentsHost): void {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    this.logger.log(`caught exception ${exception}`);

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = HttpExceptionFilter.getPayload(
      exception,
      httpStatus,
      ctx.getRequest<Request>(),
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
