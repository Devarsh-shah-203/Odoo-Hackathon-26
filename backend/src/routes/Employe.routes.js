import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/Employe.controller.js";

import  authenticate  from "../middlewares/auth.middleware.js";
import  authorize  from "../middlewares/role.middleware.js";

const router = Router();

// Only Fleet Manager can manage employees
router.use(authenticate);
router.use(authorize("FLEET_MANAGER"));


router.post("/create",createEmployee);
router.get("/getAll",getEmployees);

router.route("/update/:id")
  .get(getEmployeeById)
  .patch(updateEmployee)
  .delete(deleteEmployee);

export default router;