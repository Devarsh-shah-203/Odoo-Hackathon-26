import Trip from "../models/trip.model.js";
import Maintenance from "../models/maintenance.model.js";
import FuelLog from "../models/fuelLog.model.js";
import Vehicle from "../models/vehicle.model.js";


export const getDashboardStats = async () => {
  const totalVehicles = await Vehicle.countDocuments();

  const totalTrips = await Trip.countDocuments();

  const totalMaintenance = await Maintenance.countDocuments();

  const totalFuelLogs = await FuelLog.countDocuments();


  return {
    totalVehicles,
    totalTrips,
    totalMaintenance,
    totalFuelLogs
  };
};



export const getRecentTrips = async () => {

  const trips = await Trip.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("vehicleId")
    .populate("driverId");


  return trips;
};



export const getRecentMaintenance = async () => {

  const maintenance = await Maintenance.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("vehicleId");


  return maintenance;
};