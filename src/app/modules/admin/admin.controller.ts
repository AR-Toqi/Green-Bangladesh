import { Request, Response } from "express";

import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { AdminServices } from "./admin.service";
import { sendResponse } from "../../shared/sendResponse";

const updateDistrict = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminServices.updateDistrictEnvironmentalMetrics(id as string, req.body);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "District environmental metrics updated successfully",
        data: result
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.getAllUsers();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Users fetched successfully",
        data: result
    });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    const result = await AdminServices.updateUserRole(id as string, role);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User role updated successfully",
        data: result
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status: userStatus } = req.body;
    const result = await AdminServices.updateUserStatus(id as string, userStatus);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User status updated successfully",
        data: result
    });
});

const deletePlantationReport = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminServices.deletePlantationReport(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Plantation report deleted successfully",
        data: result
    });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.getAllAdmins();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admins fetched successfully",
        data: result
    });
});

const updateOwnProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as any).userId;
    const result = await AdminServices.updateOwnProfile(userId, req.body);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Profile updated successfully",
        data: result
    });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const requestingUserId = (req.user as any).userId;
    const result = await AdminServices.deleteAdmin(id as string, requestingUserId);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin deleted successfully",
        data: result
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminServices.deleteUser(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User deleted successfully",
        data: result
    });
});

const getAllPlantationReports = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.getAllPlantationReports();

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Plantation reports fetched successfully",
        data: result
    });
});

export const AdminControllers = {
    updateDistrict,
    getAllUsers,
    updateUserRole,
    updateUserStatus,
    deletePlantationReport,
    getAllAdmins,
    updateOwnProfile,
    deleteAdmin,
    deleteUser,
    getAllPlantationReports
};
