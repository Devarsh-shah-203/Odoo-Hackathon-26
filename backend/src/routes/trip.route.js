import { Router } from "express";

import {
    createTripController,
    getTripsController,
    getTripByIdController,
    dispatchTripController,
    completeTripController,
    cancelTripController,
} from "../controllers/trip.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = Router();

/*
    All Trip APIs
*/

router.use(authenticate);

/*
    Fleet Manager Only
*/

router.post(
    "/",
    authorize("FLEET_MANAGER"),
    createTripController
);

router.patch(
    "/:tripId/dispatch",
    authorize("FLEET_MANAGER"),
    dispatchTripController
);

router.patch(
    "/:tripId/complete",
    authorize("FLEET_MANAGER"),
    completeTripController
);

router.patch(
    "/:tripId/cancel",
    authorize("FLEET_MANAGER"),
    cancelTripController
);

/*
    Logged In Users
*/

router.get(
    "/",
    getTripsController
);

router.get(
    "/:tripId",
    getTripByIdController
);

export default router;