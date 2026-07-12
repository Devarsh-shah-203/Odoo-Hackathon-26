import Trip from "../models/trip.model.js";
import Vehicle from "../models/vehicle.model.js";
import Driver from "../models/driver.model.js";

import ApiError from "../utils/ApiError.js";

/**
 * Create Trip
 */
const createTrip = async (tripData) => {
    const {
        tripNumber,
        vehicle,
        driver,
        source,
        destination,
        cargoWeight,
        plannedDistance,
        remarks,
    } = tripData;

    const existingTrip = await Trip.findOne({ tripNumber });

    if (existingTrip) {
        throw new ApiError(409, "Trip number already exists");
    }

    const vehicleData = await Vehicle.findById(vehicle);

    if (!vehicleData) {
        throw new ApiError(404, "Vehicle not found");
    }

    if (vehicleData.status !== "Available") {
        throw new ApiError(
            400,
            `Vehicle is currently ${vehicleData.status}`
        );
    }

    const driverData = await Driver.findById(driver);

    if (!driverData) {
        throw new ApiError(404, "Driver not found");
    }

    if (driverData.status !== "Available") {
        throw new ApiError(
            400,
            `Driver is currently ${driverData.status}`
        );
    }

    if (
        cargoWeight >
        vehicleData.maximumLoadCapacity
    ) {
        throw new ApiError(
            400,
            "Cargo exceeds vehicle capacity"
        );
    }

    const trip = await Trip.create({
        tripNumber,
        vehicle,
        driver,
        source,
        destination,
        cargoWeight,
        plannedDistance,
        remarks,
        startOdometer: vehicleData.odometer,
    });

    return trip.populate([
        {
            path: "vehicle",
        },
        {
            path: "driver",
            populate: {
                path: "user",
            },
        },
    ]);
};

/**
 * Get All Trips
 */

const getTrips = async () => {
    return await Trip.find()
        .populate("vehicle")
        .populate({
            path: "driver",
            populate: {
                path: "user",
            },
        })
        .sort({
            createdAt: -1,
        });
};

/**
 * Get Trip By Id
 */

const getTripById = async (tripId) => {
    const trip = await Trip.findById(tripId)
        .populate("vehicle")
        .populate({
            path: "driver",
            populate: {
                path: "user",
            },
        });

    if (!trip) {
        throw new ApiError(404, "Trip not found");
    }

    return trip;
};

/**
 * Dispatch Trip
 */

const dispatchTrip = async (tripId) => {
    const trip = await Trip.findById(tripId);

    if (!trip) {
        throw new ApiError(404, "Trip not found");
    }

    if (trip.status !== "Draft") {
        throw new ApiError(
            400,
            "Only Draft trip can be dispatched"
        );
    }

    await Vehicle.findByIdAndUpdate(
        trip.vehicle,
        {
            status: "On Trip",
        }
    );

    await Driver.findByIdAndUpdate(
        trip.driver,
        {
            status: "On Trip",
        }
    );

    trip.status = "Dispatched";

    trip.dispatchedAt = new Date();

    await trip.save();

    return trip;
};

/**
 * Complete Trip
 */

const completeTrip = async (
    tripId,
    completionData
) => {
    const {
        actualDistance,
        fuelUsed,
        endOdometer,
    } = completionData;

    const trip = await Trip.findById(tripId);

    if (!trip) {
        throw new ApiError(404, "Trip not found");
    }

    if (trip.status !== "Dispatched") {
        throw new ApiError(
            400,
            "Trip is not dispatched"
        );
    }

    trip.status = "Completed";

    trip.actualDistance = actualDistance;

    trip.fuelUsed = fuelUsed;

    trip.endOdometer = endOdometer;

    trip.completedAt = new Date();

    await trip.save();

    await Vehicle.findByIdAndUpdate(
        trip.vehicle,
        {
            status: "Available",
            odometer: endOdometer,
        }
    );

    await Driver.findByIdAndUpdate(
        trip.driver,
        {
            status: "Available",
        }
    );

    return trip;
};

/**
 * Cancel Trip
 */

const cancelTrip = async (tripId) => {
    const trip = await Trip.findById(tripId);

    if (!trip) {
        throw new ApiError(404, "Trip not found");
    }

    if (trip.status === "Completed") {
        throw new ApiError(
            400,
            "Completed trip cannot be cancelled"
        );
    }

    trip.status = "Cancelled";

    await trip.save();

    await Vehicle.findByIdAndUpdate(
        trip.vehicle,
        {
            status: "Available",
        }
    );

    await Driver.findByIdAndUpdate(
        trip.driver,
        {
            status: "Available",
        }
    );

    return trip;
};

export {
    createTrip,
    getTrips,
    getTripById,
    dispatchTrip,
    completeTrip,
    cancelTrip,
};