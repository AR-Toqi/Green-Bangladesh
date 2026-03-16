import { NextFunction, Request, Response } from 'express';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../helpers/jwtHelpers';
import AppError from '../errors/AppError';
import status from 'http-status';
import { catchAsync } from '../shared/catchAsync';
import { envConfig } from '../../config';

const checkAuth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if token is not sent
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    let decoded: JwtPayload;
    try {
      decoded = jwtHelpers.verifyToken(
        token,
        envConfig.JWT_ACCESS_SECRET as Secret,
      );
    } catch (error) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

    // set user to req
    req.user = decoded;

    // role checking
    if (roles.length > 0 && !roles.includes(decoded.role)) {
      throw new AppError(status.FORBIDDEN, 'Forbidden');
    }

    next();
  });
};

export default checkAuth;
