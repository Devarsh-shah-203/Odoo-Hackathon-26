// seed.js

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import User from "./src/models/user.model.js";
import Driver from "./src/models/driver.model.js";
import Vehicle from "./src/models/vehicle.model.js";

const MONGODB_URL = process.env.MONGODB_URL;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ MongoDB Connected");

  
    // ---------------- USERS ----------------

    const fleetManager = await User.create({
      username: "Fleet Manager",
      email: "manager@example.com",
      password: "Password123",
      phone: "9876543210",
      role: "FLEET_MANAGER",
    });

    const driver1 = await User.create({
      username: "Rahul Sharma",
      email: "rahul@example.com",
      password: "Password123",
      phone: "9876543211",
      role: "DRIVER",
    });

    const driver2 = await User.create({
      username: "Amit Patel",
      email: "amit@example.com",
      password: "Password123",
      phone: "9876543212",
      role: "DRIVER",
    });

    const safetyOfficer = await User.create({
      username: "Safety Officer",
      email: "safety@example.com",
      password: "Password123",
      phone: "9876543213",
      role: "SAFETY_OFFICER",
    });

    console.log("✅ Users Created");

    // ---------------- DRIVERS ----------------

    await Driver.insertMany([
      {
        user: driver1._id,
        licenseNumber: "DL20240001",
        licenseCategory: "Transport",
        licenseExpiryDate: new Date("2028-06-20"),
        safetyScore: 96,
        status: "Available",
      },
      {
        user: driver2._id,
        licenseNumber: "DL20240002",
        licenseCategory: "HMV",
        licenseExpiryDate: new Date("2027-11-15"),
        safetyScore: 88,
        status: "On Trip",
      },
    ]);

    console.log("✅ Drivers Created");

    // ---------------- VEHICLES ----------------

    await Vehicle.insertMany([
      {
        registrationNumber: "GJ01AB1234",
        vehicleName: "Tata Prima",
        vehicleType: "Truck",
        maximumLoadCapacity: 25000,
        odometer: 135000,
        acquisitionCost: 3500000,
        status: "Available",
      },
      {
        registrationNumber: "GJ01CD5678",
        vehicleName: "Ashok Leyland",
        vehicleType: "Truck",
        maximumLoadCapacity: 18000,
        odometer: 92000,
        acquisitionCost: 2800000,
        status: "On Trip",
      },
      {
        registrationNumber: "GJ01EF9012",
        vehicleName: "Mahindra Supro",
        vehicleType: "Mini Truck",
        maximumLoadCapacity: 1500,
        odometer: 45000,
        acquisitionCost: 750000,
        status: "Available",
      },
      {
        registrationNumber: "GJ01GH3456",
        vehicleName: "Force Traveller",
        vehicleType: "Van",
        maximumLoadCapacity: 2500,
        odometer: 68000,
        acquisitionCost: 1200000,
        status: "In Shop",
      },
    ]);

    console.log("✅ Vehicles Created");

    console.log("\n🎉 Dummy data seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();