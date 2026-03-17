import { Router } from "express";
import checkAuth from "../../middleware/checkAuth";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";


const router = Router();

// District routes
router.patch(
    "/districts/:id",
    checkAuth("ADMIN"),
    validateRequest(AdminValidation.updateDistrictValidationSchema),
    AdminControllers.updateDistrict
);

// User routes
router.get("/users", checkAuth("ADMIN"), AdminControllers.getAllUsers);

router.patch(
    "/users/:id/role",
    checkAuth("ADMIN"),
    validateRequest(AdminValidation.updateUserRoleValidationSchema),
    AdminControllers.updateUserRole
);

router.patch(
    "/users/:id/status",
    checkAuth("ADMIN"),
    validateRequest(AdminValidation.updateUserStatusValidationSchema),
    AdminControllers.updateUserStatus
);

// Plantation routes
router.delete("/plantations/:id", checkAuth("ADMIN"), AdminControllers.deletePlantationReport);

export const AdminRoutes = router;
