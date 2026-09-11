import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } = this.resolve(exception);

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url} -> ${status}`,
        (exception as Error)?.stack,
      );
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message,
    });
  }

  private resolve(exception: unknown): {
    status: HttpStatus;
    message: string | string[];
  } {
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      const message =
        typeof body === 'string'
          ? body
          : ((body as { message?: string | string[] }).message ??
            exception.message);
      return { status: exception.getStatus(), message };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          return {
            status: HttpStatus.CONFLICT,
            message: `Já existe um registro com esse valor único (${(exception.meta?.target as string[])?.join(', ')}).`,
          };
        case 'P2025':
          return {
            status: HttpStatus.NOT_FOUND,
            message: 'Registro não encontrado.',
          };
        case 'P2003':
          return {
            status: HttpStatus.BAD_REQUEST,
            message:
              'Restrição de integridade referencial: a referência informada não existe ou o registro possui vínculos que impedem a exclusão.',
          };
        default:
          return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Erro ao processar a requisição no banco de dados.',
          };
      }
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erro interno no servidor.',
    };
  }
}
