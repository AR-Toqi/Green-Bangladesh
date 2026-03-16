import { Router } from "express";
import checkAuth from "../../middleware/auth";
import { AdminControllers } from "./admin.controller";


const router = Router();

// District routes
router.patch("/districts/:id", checkAuth("ADMIN"), AdminControllers.updateDistrict);

// User routes
router.get("/users", checkAuth("ADMIN"), AdminControllers.getAllUsers);
router.patch("/users/:id/role", checkAuth("ADMIN"), AdminControllers.updateUserRole);
router.patch("/users/:id/status", checkAuth("ADMIN"), AdminControllers.updateUserStatus);

// Plantation routes
router.delete("/plantations/:id", checkAuth("ADMIN"), AdminControllers.deletePlantationReport);

export const AdminRoutes = router;
