import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { DistrictServices } from "./districts.service";
import { sendResponse } from "../../shared/sendResponse";

import { paginationHelper } from "../../helpers/paginationHelper";

const getAllDistricts = catchAsync(async (req: Request, res: Response) => {
    const filters = req.query; // You might want to filter out non-pagination fields here
    const paginationOptions = paginationHelper.calculatePagination({
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string,
    });

    const result = await DistrictServices.getAllDistricts(paginationOptions);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Districts fetched successfully",
        meta: result.meta,
        data: result.data
    });
});

const getSingleDistrict = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DistrictServices.getDistrictById(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "District fetched successfully",
        data: result
    });
});

export const DistrictControllers = {
    getAllDistricts,
    getSingleDistrict
};
