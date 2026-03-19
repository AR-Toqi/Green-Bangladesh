import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';


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

export const authRoute = router;