import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { PlantationServices } from "./plantations.service";
import { sendResponse } from "../../shared/sendResponse";

const createPlantationReport = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await PlantationServices.createPlantationReport({
        districtId: req.body.districtId,
        numberOfTrees: req.body.numberOfTrees,
        location: req.body.location,
        userId: user.id || user.userId
    });

    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Plantation report created successfully",
        data: result
    });
});

const getAllPlantationReports = catchAsync(async (req: Request, res: Response) => {
    const result = await PlantationServices.getAllPlantationReports();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Plantation reports fetched successfully",
        data: result
    });
});

export const PlantationControllers = {
    createPlantationReport,
    getAllPlantationReports
};
