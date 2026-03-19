import status from 'http-status';
import { auth } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { IRegister, ILogin } from './auth.interface';
import AppError from '../../errors/AppError';
import { tokenHelpers } from '../../helpers/tokenHelpers';

const registerUserService = async (payload: IRegister) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password
    }
  });
  if (!data.user) {
    throw new AppError(status.BAD_REQUEST, "User registration failed");
  };

  // Create Profile for the new user in a transaction
  await prisma.$transaction(async (tx) => {
    await tx.profile.create({
      data: {
        userId: data.user.id,
      },
    });
  });

  const jwtPayload = {
    userId: data.user.id,
    email: data.user.email,
    role: data.user.role,
    name: data.user.name,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  };

  const accessToken = tokenHelpers.getAccessToken(
    jwtPayload
  );

  const refreshToken = tokenHelpers.getRefreshToken(
    jwtPayload,
  );

  return {
    ...data,
    accessToken,
    refreshToken,
  };
};


const loginUserService = async (payload: ILogin) => {
  const { email, password } = payload;
  const session = await auth.api.signInEmail({
    body: {
      email, password
    }
  });

  if (!session) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
  }

  if (session.user.status === "INACTIVE") {
    throw new AppError(status.FORBIDDEN, "User is inactive");
  }
  if (session.user.isDeleted) {
    throw new AppError(status.FORBIDDEN, "User is deleted");
  }

  const jwtPayload = {
    userId: session.user.id,
    email: session.user.email,
    role: session.user.role,
    name: session.user.name,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  };

  const accessToken = tokenHelpers.getAccessToken(
    jwtPayload
  );

  const refreshToken = tokenHelpers.getRefreshToken(
    jwtPayload,
  );

  return {
    ...session,
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUserService,
  loginUserService
};