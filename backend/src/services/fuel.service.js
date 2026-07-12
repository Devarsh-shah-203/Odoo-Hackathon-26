import FuelLog from "../models/fuelLog.model.js";
import Vehicle from "../models/vehicle.model.js";
import Trip from "../models/trip.model.js";


// Create Fuel Log
export const createFuelLog = async (fuelData) => {

    const {
        vehicle,
        trip,
        fuelType,
        quantity,
        pricePerLiter,
        fuelStation,
        odometerReading,
        fuelDate,
        remarks
    } = fuelData;


    const vehicleExists = await Vehicle.findById(vehicle);

    if (!vehicleExists) {
        throw new Error("Vehicle not found");
    }


    const tripExists = await Trip.findById(trip);

    if (!tripExists) {
        throw new Error("Trip not found");
    }


    const totalCost = quantity * pricePerLiter;


    const fuelLog = await FuelLog.create({

        vehicle,
        trip,
        fuelType,
        quantity,
        pricePerLiter,
        totalCost,
        fuelStation,
        odometerReading,
        fuelDate,
        remarks

    });


    return fuelLog;

};



// Get Fuel Logs
export const getFuelLogs = async () => {


    const fuelLogs = await FuelLog.find()
        .populate("vehicle")
        .populate("trip")
        .sort({
            createdAt: -1
        });


    return fuelLogs;

};