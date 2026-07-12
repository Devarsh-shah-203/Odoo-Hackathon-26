import express from "express";


import {
    tripReport,
    maintenanceReport,
    fuelReport,
    expenseReport,
    fleetSummaryReport
} from "../controllers/report.controller.js";



const router = express.Router();



router.get(
    "/trips",
    tripReport
);



router.get(
    "/maintenance",
    maintenanceReport
);



router.get(
    "/fuel",
    fuelReport
);



router.get(
    "/expenses",
    expenseReport
);



router.get(
    "/fleet-summary",
    fleetSummaryReport
);



export default router;