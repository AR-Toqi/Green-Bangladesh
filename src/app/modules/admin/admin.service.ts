import { prisma } from "../../lib/prisma";


const updateDistrictEnvironmentalMetrics = async (id: string, payload: { area?: number; estimatedTrees?: number; treesPerKm2?: number }) => {
    const result = await prisma.district.update({
        where: { id },
        data: payload
    });
    return result;
};

const getAllUsers = async () => {
    const result = await prisma.user.findMany({
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
    const result = await prisma.user.update({
        where: { id },
        data: { role }
    });
    return result;
};

const updateUserStatus = async (id: string, status: 'BLOCKED' | 'ACTIVE') => {
    const result = await prisma.user.update({
        where: { id },
        data: { status }
    });
    return result;
};

const deletePlantationReport = async (id: string) => {
    const result = await prisma.plantationReport.delete({
        where: { id }
    });
    return result;
};

export const AdminServices = {
    updateDistrictEnvironmentalMetrics,
    getAllUsers,
    updateUserRole,
    updateUserStatus,
    deletePlantationReport
};
