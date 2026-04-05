import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import pkg from "@prisma/client";
const { Role, UserStatus } = pkg;


const updateDistrictEnvironmentalMetrics = async (id: string, payload: { area?: number; estimatedTrees?: number; treesPerKm2?: number }) => {
    const district = await prisma.district.findUnique({
        where: { id }
    });

    if (!district) {
        throw new AppError(httpStatus.NOT_FOUND, "District not found");
    }

    const result = await prisma.district.update({
        where: { id },
        data: payload
    });
    return result;
};

const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        where: {
            isDeleted: false
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            _count: {
                select: {
                    plantationReports: true
                }
            }
        }
    });
    return result;
};

const updateUserRole = async (id: string, role: 'USER' | 'ADMIN') => {
    const user = await prisma.user.findUnique({
        where: { id, isDeleted: false }
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const result = await prisma.user.update({
        where: { id },
        data: { role }
    });
    return result;
};

const updateUserStatus = async (id: string, status: 'BLOCKED' | 'ACTIVE') => {
    const user = await prisma.user.findUnique({
        where: { id, isDeleted: false }
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const result = await prisma.user.update({
        where: { id },
        data: { status }
    });
    return result;
};

const deletePlantationReport = async (id: string) => {
    const report = await prisma.plantationReport.findUnique({
        where: { id }
    });

    if (!report) {
        throw new AppError(httpStatus.NOT_FOUND, "Plantation report not found");
    }

    const result = await prisma.plantationReport.delete({
        where: { id }
    });
    return result;
};

const getAllAdmins = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: Role.ADMIN,
            isDeleted: false
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true
        }
    });
    return result;
};

const updateOwnProfile = async (userId: string, payload: { name?: string }) => {
    const user = await prisma.user.findUnique({
        where: { id: userId, isDeleted: false }
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const result = await prisma.user.update({
        where: { id: userId },
        data: payload
    });
    return result;
};

const deleteUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id, isDeleted: false }
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const result = await prisma.user.update({
        where: { id },
        data: { isDeleted: true }
    });
    return result;
};

const deleteAdmin = async (targetId: string, requestingUserId: string) => {
    if (targetId === requestingUserId) {
        throw new AppError(httpStatus.FORBIDDEN, "You cannot delete your own account");
    }

    const targetAdmin = await prisma.user.findUnique({
        where: {
            id: targetId,
            role: Role.ADMIN,
            isDeleted: false
        }
    });

    if (!targetAdmin) {
        throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
    }

    const result = await prisma.user.update({
        where: { id: targetId },
        data: { isDeleted: true }
    });
    return result;
};

const getAllPlantationReports = async () => {
    const result = await prisma.plantationReport.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            district: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};

export const AdminServices = {
    updateDistrictEnvironmentalMetrics,
    getAllUsers,
    updateUserRole,
    updateUserStatus,
    deletePlantationReport,
    getAllAdmins,
    updateOwnProfile,
    deleteAdmin,
    deleteUser,
    getAllPlantationReports
};
