import { Request, Response } from 'express';
import status from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';

import { IRegister, ILogin } from './auth.interface';
import { AuthServices } from './auth.service';
import { tokenHelpers } from '../../helpers/tokenHelpers';
import AppError from '../../errors/AppError';
import { cookieUtils } from '../../helpers/cookie';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IRegister = req.body;
  const result = await AuthServices.registerUserService(payload);
  const { accessToken, refreshToken, token, ...rest } = result;

  tokenHelpers.setAccessTokenCookie(res, accessToken);
  tokenHelpers.setRefreshTokenCookie(res, refreshToken);
  tokenHelpers.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload: ILogin = req.body;
  const result = await AuthServices.loginUserService(payload);
  const { accessToken, refreshToken, token, ...rest } = result;

  tokenHelpers.setAccessTokenCookie(res, accessToken);
  tokenHelpers.setRefreshTokenCookie(res, refreshToken);
  tokenHelpers.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const getNewToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = cookieUtils.getCookie(req, 'refreshToken');
  const sessionToken = cookieUtils.getCookie(req, 'better-auth.session_token');

  if (!refreshToken) {
    throw new AppError(status.UNAUTHORIZED, 'Refresh token not found');
  }
  if (!sessionToken) {
    throw new AppError(status.UNAUTHORIZED, 'Session token not found');
  }

  const result = await AuthServices.refreshTokenService(
    refreshToken,
    sessionToken,
  );
  const { accessToken, refreshToken: newRefreshToken, token, ...rest } = result;

  tokenHelpers.setAccessTokenCookie(res, accessToken);
  tokenHelpers.setRefreshTokenCookie(res, newRefreshToken);
  if (token) {
    tokenHelpers.setBetterAuthSessionCookie(res, token);
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Token refreshed successfully',
    data: {
      accessToken,
      refreshToken: newRefreshToken,
      token,
      ...rest,
    },
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  getNewToken,
};