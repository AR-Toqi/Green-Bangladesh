import { Request, Response } from 'express';
import status from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';

import { IRegister, ILogin, IChangePassword } from './auth.interface';
import { tokenHelpers } from '../../helpers/tokenHelpers';
import AppError from '../../errors/AppError';
import { cookieUtils } from '../../helpers/cookie';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IRegister = req.body;
  const result = await AuthServices.registerUser(payload);
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
  const result = await AuthServices.loginUser(payload);
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

  const result = await AuthServices.getNewToken(
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

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const payload: IChangePassword = req.body;
  const sessionToken = cookieUtils.getCookie(req, 'better-auth.session_token');

  if (!sessionToken) {
    throw new AppError(status.UNAUTHORIZED, 'Session token not found');
  }

  const result = await AuthServices.changePassword(payload, sessionToken);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenHelpers.setAccessTokenCookie(res, accessToken);
  tokenHelpers.setRefreshTokenCookie(res, refreshToken);
  tokenHelpers.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: {
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const sessionToken = cookieUtils.getCookie(req, 'better-auth.session_token');

  if (!sessionToken) {
    throw new AppError(status.UNAUTHORIZED, 'Session token not found');
  }

  const result = await AuthServices.logoutUser(sessionToken);

  cookieUtils.clearCookie(res, 'better-auth.session_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',

  });
  cookieUtils.clearCookie(res, 'accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  cookieUtils.clearCookie(res, 'refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'User logged out successfully',
    data: result,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.verifyEmail(req.body);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Email verified successfully',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'OTP sent to your email',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.resetPassword(req.body);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  getNewToken,
  changePassword,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};