import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { DistrictServices } from "./districts.service.js";
import { sendResponse } from "../../shared/sendResponse.js";

const getAllDistricts = catchAsync(async (req: Request, res: Response) => {
    const result = await DistrictServices.getAllDistrictsFromDB();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Districts fetched successfully",
        data: result
    });
});

const getSingleDistrict = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DistrictServices.getSingleDistrictFromDB(id as string);

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
