import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createVehicleService,
    getVehiclesService,
    getVehicleByIdService,
    updateVehicleService,
    deleteVehicleService,
    getAvailableVehiclesService,
} from "../services/vehicle.service.js";

export const createVehicle = asyncHandler(async (req, res) => {

    const vehicle = await createVehicleService(req.body);

    return res.status(201).json(
        new ApiResponse(201, vehicle, "Vehicle registered successfully.")
    );
});

export const getVehicles = asyncHandler(async (req, res) => {

    const vehicles = await getVehiclesService();

    return res.status(200).json(
        new ApiResponse(200, vehicles, "Vehicles fetched successfully.")
    );
});

export const getVehicleById = asyncHandler(async (req, res) => {

    const vehicle = await getVehicleByIdService(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, vehicle, "Vehicle fetched successfully.")
    );
});

export const updateVehicle = asyncHandler(async (req, res) => {

    const vehicle = await updateVehicleService(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(200, vehicle, "Vehicle updated successfully.")
    );
});

export const deleteVehicle = asyncHandler(async (req, res) => {

    await deleteVehicleService(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, null, "Vehicle deleted successfully.")
    );
});

export const getAvailableVehicles = asyncHandler(async (req, res) => {

    const vehicles = await getAvailableVehiclesService();

    return res.status(200).json(
        new ApiResponse(
            200,
            vehicles,
            "Available vehicles fetched successfully."
        )
    );
});