import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createEmployeeService,
  getEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
  deleteEmployeeService,
} from "../services/Emlpoye.service.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const employee = await createEmployeeService(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      employee,
      "Employee created successfully."
    )
  );
});

export const getEmployees = asyncHandler(async (req, res) => {
  console.log("GET EMPLOYEES HIT");
  const employees = await getEmployeesService();

  return res.status(200).json(
    new ApiResponse(
      200,
      employees,
      "Employees fetched successfully."
    )
  );
});

export const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await getEmployeeByIdService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee fetched successfully."
    )
  );
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await updateEmployeeService(
    req.params.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      employee,
      "Employee updated successfully."
    )
  );
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  await deleteEmployeeService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Employee deleted successfully."
    )
  );
});