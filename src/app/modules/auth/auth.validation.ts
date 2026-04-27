import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address'),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address'),
    otp: z.string().min(6, 'OTP must be at least 6 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

const verifyEmailValidationSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address'),
    otp: z.string().min(6, 'OTP must be at least 6 characters long'),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
  verifyEmailValidationSchema,
};

