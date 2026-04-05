import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { LeaderboardServices } from "./leaderboard.service";
import { sendResponse } from "../../shared/sendResponse";

const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
    const result = await LeaderboardServices.getLeaderboardFromDB();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Leaderboard fetched successfully",
        data: result
    });
});

export const LeaderboardControllers = {
    getLeaderboard
};
