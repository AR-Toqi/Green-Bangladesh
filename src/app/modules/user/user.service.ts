import status from 'http-status';
import { prisma } from '../../lib/prisma';
import AppError from '../../errors/AppError';
import { TUpdateProfile } from './user.interface';
import pkg from "@prisma/client";
const { UserStatus } = pkg;

const getME = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      needsPasswordChange: true,
      profile: true,
    },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, 'User not found!');
  }

  return result;
};

const updateME = async (
  userId: string,
  payload: TUpdateProfile,
) => {
  const { name, ...profileData } = payload;

  const result = await prisma.$transaction(async (tx) => {
    // Update User name if provided
    if (name) {
      await tx.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    // Upsert Profile
    await tx.profile.upsert({
      where: { userId },
      update: profileData,
      create: {
        ...profileData,
        userId,
      },
    });

    // Return the full user object including profile (excluding password)
    return await tx.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
      },
    });
  });

  return result;
};

const deleteME = async (userId: string) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      isDeleted: true,
      status: UserStatus.DELETED,
      deletedAt: new Date(),
    },
  });

  return result;
};

export const UserService = {
  getME,
  updateME,
  deleteME,
};
