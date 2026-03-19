import { NextFunction, Request, Response } from 'express';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../helpers/jwtHelpers';
import AppError from '../errors/AppError';
import status from 'http-status';
import { catchAsync } from '../shared/catchAsync';
import { envConfig } from '../../config';
import { cookieUtils } from '../helpers/cookie';
import { auth } from '../lib/auth';

const checkAuth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers.authorization;
    const sessionToken = cookieUtils.getCookie(req, 'better-auth.session_token');
    const cookieAccessToken = cookieUtils.getCookie(req, 'accessToken');

    let decoded: JwtPayload | null = null;

    // 1. Check Better Auth Session Token first
    if (sessionToken) {
      const session = await auth.api.getSession({
        headers: new Headers(req.headers as any),
      });

      if (session) {
        decoded = {
          userId: session.user.id,
          email: session.user.email,
          role: session.user.role,
          name: session.user.name,
          status: session.user.status,
          isDeleted: session.user.isDeleted,
          emailVerified: session.user.emailVerified,
        } as JwtPayload;
      }
    }

    // 2. Fallback to JWT if session not found or invalid
    const token = headerToken || cookieAccessToken;
    if (!decoded && token) {
      try {
        decoded = jwtHelpers.verifyToken(
          token,
          envConfig.JWT_ACCESS_SECRET as Secret,
        );
      } catch (error) {
        throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
      }
    }

    if (!decoded) {
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
