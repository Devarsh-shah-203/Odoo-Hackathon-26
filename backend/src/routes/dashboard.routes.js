import express from "express";

import {
  dashboardStats,
  recentTrips,
  recentMaintenance
} from "../controllers/dashboard.controller.js";


const router = express.Router();



router.get(
  "/stats",
  dashboardStats
);



router.get(
  "/recent-trips",
  recentTrips
);



router.get(
  "/recent-maintenance",
  recentMaintenance
);



export default router;