import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.code === 'P2002') {
      return response.status(409).json({
        statusCode: 409,
        message: 'A record with these unique values already exists',
      });
    }

    if (exception.code === 'P2003') {
      return response.status(400).json({
        statusCode: 400,
        message: 'Related record does not exist',
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Database error',
    });
  }
}
