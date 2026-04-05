import { Router } from "express";
import { PlantationControllers } from "./plantations.controller";
import checkAuth from "../../middleware/checkAuth";
import validateRequest from "../../middleware/validateRequest";
import { PlantationValidation } from "./plantations.validation";

const router = Router();

router.post(
    "/",
    checkAuth("USER", "ADMIN"),
    validateRequest(PlantationValidation.createPlantationReportValidationSchema),
    PlantationControllers.createPlantationReport
);

router.get("/", checkAuth("USER", "ADMIN"), PlantationControllers.getAllPlantationReports);

export const PlantationRoutes = router;
