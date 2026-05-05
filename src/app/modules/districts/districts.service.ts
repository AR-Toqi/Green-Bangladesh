import { prisma } from "../../lib/prisma";
import { calculateCO2Offset } from "../../helpers/environmental";


const calculateScoreAndZone = (treesPerKm2: number) => {
    let score = (treesPerKm2 / 5000) * 100;
    score = Math.min(100, Math.max(0, score));

    let zone: 'RED' | 'ORANGE' | 'GREEN';
    if (score <= 25) {
        zone = 'RED';
    } else if (score <= 50) {
        zone = 'ORANGE';
    } else {
        zone = 'GREEN';
    }

    return { score: Number(score.toFixed(2)), zone };
};

const getAllDistricts = async (options: any) => {
    const { page, limit, skip, sortBy, sortOrder } = options;

    const districts = await prisma.district.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            division: true
        }
    });

    const total = await prisma.district.count();

    const result = districts.map(district => {
        const { score, zone } = calculateScoreAndZone(district.treesPerKm2);
        const co2Impact = calculateCO2Offset(district.estimatedTrees);
        return {
            ...district,
            score,
            zone,
            co2Impact
        };
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const getDistrictById = async (id: string) => {
    const district = await prisma.district.findUnique({
        where: { id },
        include: {
            division: true
        }
    });

    if (!district) {
        return null;
    }

    const { score, zone } = calculateScoreAndZone(district.treesPerKm2);
    const co2Impact = calculateCO2Offset(district.estimatedTrees);
    return {
        ...district,
        score,
        zone,
        co2Impact
    };
};

export const DistrictServices = {
    getAllDistricts,
    getDistrictById
};
