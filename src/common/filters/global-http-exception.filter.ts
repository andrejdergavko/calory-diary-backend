import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const json = {
      statusCode,
      message: exception.message,
      timestamp: new Date().toISOString(), // Добавили дату
      customField: 'customField',
    };

    response.status(statusCode).json(json);
  }
}
