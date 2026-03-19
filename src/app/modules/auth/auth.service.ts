import status from 'http-status';
import { auth } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { IRegister, ILogin } from './auth.interface';
import AppError from '../../errors/AppError';
import { tokenHelpers } from '../../helpers/tokenHelpers';
import { JwtPayload } from 'jsonwebtoken';


const registerUserService = async (payload: IRegister) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  if (!data.user) {
    throw new AppError(status.BAD_REQUEST, 'User registration failed');
  }

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
    emailVerified: data.user.emailVerified,
  };

  const accessToken = tokenHelpers.getAccessToken(jwtPayload);

  const refreshToken = tokenHelpers.getRefreshToken(jwtPayload);

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
      email,
      password,
    },
  });

  if (!session) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid email or password');
  }

  if (session.user.status === 'INACTIVE') {
    throw new AppError(status.FORBIDDEN, 'User is inactive');
  }
  if (session.user.isDeleted) {
    throw new AppError(status.FORBIDDEN, 'User is deleted');
  }

  const jwtPayload = {
    userId: session.user.id,
    email: session.user.email,
    role: session.user.role,
    name: session.user.name,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified,
  };

  const accessToken = tokenHelpers.getAccessToken(jwtPayload);

  const refreshToken = tokenHelpers.getRefreshToken(jwtPayload);

  return {
    ...session,
    accessToken,
    refreshToken,
  };
};

const refreshTokenService = async (
  refreshToken: string,
  sessionToken: string,
) => {
  // 1. Check if session token exists in DB
  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!isSessionTokenExists) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid session token');
  }

  // 2. Verify the refresh token
  const decoded = tokenHelpers.verifyRefreshToken(refreshToken);

  if (!decoded) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid refresh token');
  }

  const data = decoded as JwtPayload;

  // 3. Generate new tokens (Rotation)
  const jwtPayload = {
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified,
  };

  const newAccessToken = tokenHelpers.getAccessToken(jwtPayload);
  const newRefreshToken = tokenHelpers.getRefreshToken(jwtPayload);

  // 4. Update session in DB (Extend expiresAt)
  const { token } = await prisma.session.update({
    where: {
      token: sessionToken,
    },
    data: {
      expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
      updatedAt: new Date(),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    token, // Better Auth session token
    user: isSessionTokenExists.user,
  };
};

export const AuthServices = {
  registerUserService,
  loginUserService,
  refreshTokenService,
};