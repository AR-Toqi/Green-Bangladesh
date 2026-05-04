import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { LeaderboardServices } from "./leaderboard.service";
import { sendResponse } from "../../shared/sendResponse";

import { paginationHelper } from "../../helpers/paginationHelper";

const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions = paginationHelper.calculatePagination({
        page: Number(req.query.page),
        limit: Number(req.query.limit),
    });

    const result = await LeaderboardServices.getLeaderboardFromDB(paginationOptions);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Leaderboard fetched successfully",
        meta: result.meta,
        data: result.data
    });
});

export const LeaderboardControllers = {
    getLeaderboard
};
