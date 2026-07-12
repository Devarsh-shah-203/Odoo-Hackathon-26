import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createMaintenance,
    getMaintenanceRecords,
    getMaintenanceById,
    completeMaintenance,
} from "../services/maintenance.service.js";



/**
 * POST /api/maintenance
 */
const createMaintenanceController = asyncHandler(
    async (req, res) => {

        const maintenance =
            await createMaintenance(
                req.body
            );


        return res.status(201).json(
            new ApiResponse(
                201,
                maintenance,
                "Maintenance created successfully"
            )
        );
    }
);



/**
 * GET /api/maintenance
 */
const getMaintenanceRecordsController =
asyncHandler(
    async (req, res) => {

        const maintenanceRecords =
            await getMaintenanceRecords();


        return res.status(200).json(
            new ApiResponse(
                200,
                maintenanceRecords,
                "Maintenance records fetched successfully"
            )
        );

    }
);



/**
 * GET /api/maintenance/:maintenanceId
 */
const getMaintenanceByIdController =
asyncHandler(
    async (req, res) => {

        const {
            maintenanceId
        } = req.params;


        const maintenance =
            await getMaintenanceById(
                maintenanceId
            );


        return res.status(200).json(
            new ApiResponse(
                200,
                maintenance,
                "Maintenance record fetched successfully"
            )
        );

    }
);




/**
 * PATCH /api/maintenance/:maintenanceId/complete
 */
const completeMaintenanceController =
asyncHandler(
    async (req, res) => {

        const {
            maintenanceId
        } = req.params;


        const maintenance =
            await completeMaintenance(
                maintenanceId,
                req.body
            );


        return res.status(200).json(
            new ApiResponse(
                200,
                maintenance,
                "Maintenance completed successfully"
            )
        );

    }
);



export {
    createMaintenanceController,
    getMaintenanceRecordsController,
    getMaintenanceByIdController,
    completeMaintenanceController,
};