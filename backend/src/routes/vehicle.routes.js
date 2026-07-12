import { Router } from "express";

import {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    getAvailableVehicles,
} from "../controllers/vehicle.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/getAvailable", getAvailableVehicles);

router.use(authorize("FLEET_MANAGER"));

router.post("/create", createVehicle);

router.get("/getAll", getVehicles);

router.get("/:id", getVehicleById);

router.patch("/update/:id", updateVehicle);

router.delete("/delete/:id", deleteVehicle);

export default router;