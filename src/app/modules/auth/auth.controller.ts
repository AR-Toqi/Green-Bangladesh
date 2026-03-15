import { Request, Response } from 'express';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';

import { IRegister, ILogin } from './auth.interface';
import { authServices } from './auth.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload: IRegister = req.body;
  const user = await authServices.registerUserService(payload);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: user
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload: ILogin = req.body;
  const session = await authServices.loginUserService(payload);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: session
  });
});

export const authController = {
  registerUser,
  loginUser
};