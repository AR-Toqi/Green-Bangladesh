import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import checkAuth from '../../middleware/checkAuth';



const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.post(
  '/get-new-token',
  AuthController.getNewToken
);

router.post(
  '/change-password',
  checkAuth(),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post(
  '/logout',
  checkAuth(),
  AuthController.logoutUser
);


export const authRoute = router;
