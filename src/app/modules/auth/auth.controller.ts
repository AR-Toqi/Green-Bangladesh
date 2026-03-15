import { Request, Response } from 'express';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';

import { IRegister, ILogin } from './auth.interface';
import { authServices } from './auth.service';
import { tokenHelpers } from '../../helpers/tokenHelpers';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IRegister = req.body;
  const result = await authServices.registerUserService(payload);
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
      ...rest
    }
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload: ILogin = req.body;
  const result = await authServices.loginUserService(payload);
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
      ...rest
    }
  });
});

export const authController = {
  registerUser,
  loginUser
};