import Vehicle from "../models/vehicle.model.js";
import ApiError from "../utils/ApiError.js";

export const createVehicleService = async (data) => {

    const existingVehicle = await Vehicle.findOne({
        registrationNumber: data.registrationNumber,
    });

    if (existingVehicle) {
        throw new ApiError(409, "Vehicle already exists.");
    }

    return await Vehicle.create(data);
};

export const getVehiclesService = async () => {
    return await Vehicle.find().sort({ createdAt: -1 });
};

export const getVehicleByIdService = async (id) => {

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found.");
    }

    return vehicle;
};

export const updateVehicleService = async (id, data) => {

    const vehicle = await Vehicle.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found.");
    }

    return vehicle;
};

export const deleteVehicleService = async (id) => {

    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found.");
    }

    return vehicle;
};

export const getAvailableVehiclesService = async () => {

    return await Vehicle.find({
        status: "Available",
    });
};