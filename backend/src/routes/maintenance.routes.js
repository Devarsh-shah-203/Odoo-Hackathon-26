import { Router } from "express";

import {
    createMaintenanceController,
    getMaintenanceRecordsController,
    getMaintenanceByIdController,
    completeMaintenanceController,
} from "../controllers/maintenance.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = Router();

// Protect all routes
router.use(authenticate);

/*
    Fleet Manager Only
*/

router.post(
    "/",
    authorize("FLEET_MANAGER"),
    createMaintenanceController
);

router.patch(
    "/:maintenanceId/complete",
    authorize("FLEET_MANAGER"),
    completeMaintenanceController
);

/*
    Logged In Users
*/

router.get(
    "/",
    getMaintenanceRecordsController
);

router.get(
    "/:maintenanceId",
    getMaintenanceByIdController
);

export default router;