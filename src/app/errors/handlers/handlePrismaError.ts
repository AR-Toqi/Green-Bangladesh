import { type Prisma as PrismaType } from '@prisma/client';
import pkg from '@prisma/client';
const Prisma = (pkg as any).Prisma;
import { TErrorSources, TGenericErrorResponse } from "../../interfaces/error";

const handlePrismaError = (
  err: PrismaType.PrismaClientKnownRequestError
): TGenericErrorResponse => {
  let errorSources: TErrorSources = [];
  let message = '';
  let statusCode = 400;

  if (err.code === 'P2002') {
    const field = (err.meta?.target as string[]) || ['unknown'];
    const fieldName = field[field.length - 1] || 'unknown';
    message = 'Duplicate Entity';
    errorSources = [
      {
        path: fieldName,
        message: `${fieldName} already exists`,
      },
    ];
  } else if (err.code === 'P2025') {
    message = 'Record not found';
    errorSources = [
      {
        path: '',
        message: (err.meta?.cause as string) || 'Record not found',
      },
    ];
    statusCode = 404;
  } else {
    message = 'Prisma Error';
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaError;
