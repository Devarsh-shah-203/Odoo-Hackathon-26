import Trip from "../models/trip.model.js";
import Maintenance from "../models/maintenance.model.js";
import FuelLog from "../models/fuelLog.model.js";
import Vehicle from "../models/vehicle.model.js";


// Trip Report
export const getTripReport = async () => {

    const trips = await Trip.find()
        .sort({ createdAt: -1 })
        .populate("vehicleId")
        .populate("driverId");


    return trips;
};



// Maintenance Report
export const getMaintenanceReport = async () => {

    const maintenance = await Maintenance.find()
        .sort({ createdAt: -1 })
        .populate("vehicleId");


    return maintenance;
};



// Fuel Report
export const getFuelReport = async () => {

    const fuelLogs = await FuelLog.find()
        .sort({ createdAt: -1 })
        .populate("vehicleId");


    return fuelLogs;
};



// Expense Report
export const getExpenseReport = async () => {


    const maintenanceExpense = await Maintenance.aggregate([
        {
            $group:{
                _id:null,
                totalMaintenanceExpense:{
                    $sum:"$cost"
                }
            }
        }
    ]);



    const fuelExpense = await FuelLog.aggregate([
        {
            $group:{
                _id:null,
                totalFuelExpense:{
                    $sum:"$totalCost"
                }
            }
        }
    ]);



    return {

        maintenanceExpense:
            maintenanceExpense[0]?.totalMaintenanceExpense || 0,


        fuelExpense:
            fuelExpense[0]?.totalFuelExpense || 0,


        totalExpense:
            (maintenanceExpense[0]?.totalMaintenanceExpense || 0)
            +
            (fuelExpense[0]?.totalFuelExpense || 0)

    };

};





// Fleet Summary Report
export const getFleetSummaryReport = async () => {


    const totalVehicles = await Vehicle.countDocuments();


    const activeVehicles = await Vehicle.countDocuments({
        status:"ACTIVE"
    });


    const totalTrips = await Trip.countDocuments();


    const totalMaintenance = await Maintenance.countDocuments();



    return {

        totalVehicles,
        activeVehicles,
        totalTrips,
        totalMaintenance

    };

};