import express from 'express';
import checkAuth from '../../middleware/checkAuth';
import validateRequest from '../../middleware/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/me',
  checkAuth('USER', 'ADMIN'),
  UserController.getMyProfile,
);

router.patch(
  '/me',
  checkAuth('USER', 'ADMIN'),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateMyProfile,
);

router.delete(
  '/me',
  checkAuth('USER', 'ADMIN'),
  UserController.deleteMyAccount,
);

export const UserRoutes = router;
