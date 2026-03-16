import { Router } from "express";
import { PlantationControllers } from "./plantations.controller";
import checkAuth from "../../middleware/auth";

const router = Router();

router.post("/", checkAuth("USER", "ADMIN"), PlantationControllers.createPlantationReport);
router.get("/", checkAuth("USER", "ADMIN"), PlantationControllers.getAllPlantationReports);

export const PlantationRoutes = router;
