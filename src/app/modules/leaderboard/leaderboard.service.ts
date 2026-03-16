import { prisma } from "../../lib/prisma";

const getLeaderboardFromDB = async () => {
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

    return leaderboard.sort((a, b) => b.totalPlanted - a.totalPlanted);
};

export const LeaderboardServices = {
    getLeaderboardFromDB
};
