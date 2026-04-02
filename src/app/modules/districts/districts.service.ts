import { prisma } from "../../lib/prisma";


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

const getAllDistricts = async () => {
    const districts = await prisma.district.findMany({
        include: {
            division: true
        }
    });

    return districts.map(district => {
        const { score, zone } = calculateScoreAndZone(district.treesPerKm2);
        return {
            ...district,
            score,
            zone
        };
    });
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
    return {
        ...district,
        score,
        zone
    };
};

export const DistrictServices = {
    getAllDistricts,
    getDistrictById
};
