import { prisma } from "../../lib/prisma";

const getLeaderboardFromDB = async (options: any) => {
    const { page, limit, skip } = options;

    const districts = await prisma.district.findMany({
        include: {
            plantationReports: true
        }
    });

    const leaderboard = districts.map(district => {
        const totalPlanted = district.plantationReports.reduce((sum, report) => sum + report.numberOfTrees, 0);
        return {
            id: district.id,
            name: district.name,
            totalPlanted,
            reportCount: district.plantationReports.length
        };
    });

    // Sort by totalPlanted descending
    const sortedLeaderboard = leaderboard.sort((a, b) => b.totalPlanted - a.totalPlanted);
    
    // Perform manual pagination
    const paginatedLeaderboard = sortedLeaderboard.slice(skip, skip + limit);
    const total = leaderboard.length;

    return {
        meta: {
            page,
            limit,
            total
        },
        data: paginatedLeaderboard
    };
};

export const LeaderboardServices = {
    getLeaderboardFromDB
};
