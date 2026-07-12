import express from "express";

import {
    createFuelLogController,
    getFuelLogsController
} from "../controllers/fuel.controller.js";


const router = express.Router();


// POST /api/fuel
router.post(
    "/",
    createFuelLogController
);


// GET /api/fuel
router.get(
    "/",
    getFuelLogsController
);


export default router;