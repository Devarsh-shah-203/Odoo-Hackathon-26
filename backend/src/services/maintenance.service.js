import Maintenance from "../models/maintenance.model.js";
import Vehicle from "../models/vehicle.model.js";

import ApiError from "../utils/ApiError.js";


/**
 * Create Maintenance Record
 */
const createMaintenance = async (maintenanceData) => {

    const {
        maintenanceNumber,
        vehicle,
        maintenanceType,
        description,
        serviceCenter,
        estimatedCost,
        scheduledDate,
        remarks
    } = maintenanceData;


    const existingMaintenance =
        await Maintenance.findOne({
            maintenanceNumber
        });


    if (existingMaintenance) {
        throw new ApiError(
            409,
            "Maintenance number already exists"
        );
    }


    const vehicleData =
        await Vehicle.findById(vehicle);


    if (!vehicleData) {
        throw new ApiError(
            404,
            "Vehicle not found"
        );
    }


    if (
        vehicleData.status === "On Trip"
    ) {
        throw new ApiError(
            400,
            "Vehicle is currently on trip"
        );
    }


    const maintenance =
        await Maintenance.create({

            maintenanceNumber,

            vehicle,

            maintenanceType,

            description,

            serviceCenter,

            estimatedCost,

            scheduledDate,

            remarks

        });


    // Vehicle goes to workshop

    await Vehicle.findByIdAndUpdate(
        vehicle,
        {
            status: "In Shop"
        }
    );


    return maintenance.populate(
        "vehicle"
    );

};



/**
 * Get All Maintenance Records
 */

const getMaintenanceRecords = async () => {


    return await Maintenance.find()

        .populate("vehicle")

        .sort({
            createdAt: -1
        });

};




/**
 * Get Maintenance By ID
 */

const getMaintenanceById = async (
    maintenanceId
) => {


    const maintenance =
        await Maintenance.findById(
            maintenanceId
        )
        .populate("vehicle");


    if (!maintenance) {

        throw new ApiError(
            404,
            "Maintenance record not found"
        );

    }


    return maintenance;

};




/**
 * Complete Maintenance
 */

const completeMaintenance = async (
    maintenanceId,
    completionData
) => {


    const {
        actualCost,
        remarks
    } = completionData;



    const maintenance =
        await Maintenance.findById(
            maintenanceId
        );


    if (!maintenance) {

        throw new ApiError(
            404,
            "Maintenance record not found"
        );

    }



    if (
        maintenance.status === "Completed"
    ) {

        throw new ApiError(
            400,
            "Maintenance already completed"
        );

    }



    maintenance.status = "Completed";

    maintenance.actualCost =
        actualCost || maintenance.estimatedCost;


    maintenance.completedDate =
        new Date();


    if (remarks) {
        maintenance.remarks = remarks;
    }


    await maintenance.save();



    // Vehicle becomes available again

    await Vehicle.findByIdAndUpdate(
        maintenance.vehicle,
        {
            status: "Available"
        }
    );



    return maintenance.populate(
        "vehicle"
    );

};




export {
    createMaintenance,
    getMaintenanceRecords,
    getMaintenanceById,
    completeMaintenance
};