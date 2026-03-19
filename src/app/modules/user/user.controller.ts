import { Request, Response } from 'express';
import status from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { UserService } from './user.service';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const result = await UserService.getME(id);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const result = await UserService.updateME(id, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const result = await UserService.deleteME(id);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: 'Account deleted successfully',
    data: result,
  });
});

export const UserController = {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
};
