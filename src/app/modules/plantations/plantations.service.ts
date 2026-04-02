import { prisma } from "../../lib/prisma";
import { IPlantationReport } from "./plantations.interface";

const createPlantationReport = async (payload: IPlantationReport) => {
    const result = await prisma.plantationReport.create({
        data: payload
    });
    return result;
};

const getAllPlantationReports = async () => {
    const result = await prisma.plantationReport.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            district: true
        }
    });
    return result;
};

const getDistrictPlantationReports = async (districtId: string) => {
    const result = await prisma.plantationReport.findMany({
        where: { districtId },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });
    return result;
};

export const PlantationServices = {
    createPlantationReport,
    getAllPlantationReports,
    getDistrictPlantationReports
};
