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
      districtId: true,
      district: true,
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
  const { name, districtId, ...profileData } = payload;

  const result = await prisma.$transaction(async (tx) => {
    // Update User name or districtId if provided
    if (name || districtId) {
      await tx.user.update({
        where: { id: userId },
        data: {
          ...(name && { name }),
          ...(districtId && { districtId }),
        },
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
        districtId: true,
        district: true,
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
