import { Router } from "express";
import { DistrictControllers } from "./districts.controller";

const router = Router();

router.get("/", DistrictControllers.getAllDistricts);
router.get("/:id", DistrictControllers.getSingleDistrict);

export const DistrictRoutes = router;
